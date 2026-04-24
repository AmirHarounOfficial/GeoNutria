<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AIJob;
use App\Services\RabbitMQService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AIJobController extends Controller
{
    protected $rabbit;

    public function __construct(RabbitMQService $rabbit)
    {
        $this->rabbit = $rabbit;
    }

    public function submit(Request $request)
    {
        // 1. Basic Validation
        $request->validate([
            'type' => 'required|string',
            'user_id' => 'required|string',
            'cost' => 'required|integer',
        ]);

        $type = $request->input('type');
        $userId = $request->input('user_id');
        $cost = $request->input('cost');

        // 2. Atomic Credit Deduction via Billing Service
        $billingResponse = Http::post(env('BILLING_SERVICE_URL') . '/api/v1/credits/deduct', [
            'user_id' => $userId,
            'cost' => $cost,
            'feature' => $type,
            'reference_id' => null, // Will update after creating job
        ]);

        if ($billingResponse->failed()) {
            return response()->json([
                'message' => 'Credit deduction failed: ' . $billingResponse->json('message')
            ], 400);
        }

        // 3. Create Job Record
        $jobId = (string) Str::uuid();
        $job = AIJob::create([
            'id' => $jobId,
            'user_id' => $userId,
            'field_id' => $request->input('field_id'),
            'type' => $type,
            'status' => 'pending',
            'input_data' => $request->input('input_data'),
            'input_image_url' => $request->input('input_image_url'),
            'credits_charged' => $cost,
        ]);

        // 4. Submit to RabbitMQ
        $queueName = "ai.{$type}";
        $this->rabbit->publishJob($queueName, [
            'job_id' => $jobId,
            'user_id' => $userId,
            'type' => $type,
            'input_data' => $job->input_data,
            'input_image_url' => $job->input_image_url,
        ]);

        return response()->json([
            'job_id' => $jobId,
            'status' => 'pending',
            'message' => 'AI job submitted successfully'
        ], 202);
    }

    public function status($id)
    {
        $job = AIJob::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }
}
