<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AIJob;
use Illuminate\Support\Facades\Log;
use Junges\Kafka\Facades\Kafka;
use Junges\Kafka\Message\Message;

class InternalAIController extends Controller
{
    /**
     * Callback for AI Workers to report results.
     * Accessible only via internal network.
     */
    public function updateResult(Request $request, $id)
    {
        $job = AIJob::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $status = $request->input('status'); // 'completed' or 'failed'
        $result = $request->input('result');
        $error = $request->input('error');

        $job->update([
            'status' => $status,
            'result' => $result,
            'error_message' => $error,
            'completed_at' => now(),
        ]);

        // Emit event to Kafka for other services (Notifications, Reports)
        Kafka::publishOn('ai.events')
            ->withMessage(new Message(
                body: [
                    'event' => "ai.{$status}",
                    'job_id' => $job->id,
                    'user_id' => $job->user_id,
                    'type' => $job->type,
                    'status' => $status,
                ]
            ))
            ->send();

        return response()->json(['message' => 'Status updated']);
    }
}
