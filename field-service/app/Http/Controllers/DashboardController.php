<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    /**
     * Get aggregated KPIs for the home screen.
     */
    public function getKPIs(Request $request)
    {
        $userId = $request->input('user_id');

        // 1. Fetch Farm/Field data from User Service
        $userServiceUrl = env('USER_SERVICE_URL', 'http://user-service');
        $farmResponse = Http::get("{$userServiceUrl}/api/v1/farms/stats", ['user_id' => $userId]);
        
        // 2. Fetch IoT alerts from IoT Service
        $iotServiceUrl = env('IOT_SERVICE_URL', 'http://iot-service');
        $alertsResponse = Http::get("{$iotServiceUrl}/api/v1/iot/alerts/count", ['user_id' => $userId]);

        // 3. Mock logic for health score aggregation
        // In reality, this would query its own database (field_stats)
        $healthScore = 85; 

        return response()->json([
            'health_score' => $healthScore,
            'active_fields' => $farmResponse->json('active_fields', 0),
            'sensor_health' => $farmResponse->json('sensors_online_pct', 100),
            'pending_alerts' => $alertsResponse->json('total', 0),
            'disease_status' => 'healthy', // or 'moderate', 'urgent'
        ]);
    }

    public function getHealthTrend(Request $request)
    {
        // Mock data for the 7-day health trend chart
        return response()->json([
            'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'data' => [82, 84, 85, 83, 85, 87, 85]
        ]);
    }
}
