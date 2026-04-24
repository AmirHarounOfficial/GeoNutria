<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

class ReportController extends BaseController
{
    /**
     * Generate a PDF report for an AI analysis.
     */
    public function generate(Request $request)
    {
        $jobId = $request->input('job_id');
        $userId = $request->input('user_id');
        
        // 1. Fetch AI Job result from Orchestrator
        // 2. Fetch User Profile from User Service
        // 3. Render HTML template
        // 4. Convert to PDF (e.g. via DomPDF)
        
        Log::info("Generating report for job {$jobId}");

        return response()->json([
            'status' => 'completed',
            'report_url' => "http://s3-bucket/reports/{$jobId}.pdf",
            'generated_at' => now()
        ]);
    }

    public function list(Request $request)
    {
        $userId = $request->input('user_id');
        // Retrieve past reports from DB
        return response()->json([
            [
                'id' => 'report-1',
                'title' => 'Leaf Scan Report - Tomato',
                'date' => '2024-03-20',
                'status' => 'completed'
            ]
        ]);
    }
}
