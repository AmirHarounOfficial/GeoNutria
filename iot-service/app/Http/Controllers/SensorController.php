<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SensorController extends Controller
{
    /**
     * Ingest sensor readings via HTTP.
     * MQTT messages will also flow into a similar internal handler.
     */
    public function ingest(Request $request)
    {
        $readings = $request->input('readings'); // Array of sensor objects

        foreach ($readings as $reading) {
            DB::table('sensor_readings')->insert([
                'time' => now(),
                'sensor_id' => $reading['sensor_id'],
                'field_id' => $reading['field_id'],
                'moisture' => $reading['moisture'] ?? null,
                'ambient_temp' => $reading['ambient_temp'] ?? null,
                'soil_temp' => $reading['soil_temp'] ?? null,
                'humidity' => $reading['humidity'] ?? null,
                'light' => $reading['light'] ?? null,
                'ph' => $reading['ph'] ?? null,
                'nitrogen' => $reading['nitrogen'] ?? null,
                'phosphorus' => $reading['phosphorus'] ?? null,
                'potassium' => $reading['potassium'] ?? null,
                'chlorophyll' => $reading['chlorophyll'] ?? null,
                'ec' => $reading['ec'] ?? null,
            ]);

            // Check thresholds for alerting
            $this->checkThresholds($reading);
        }

        return response()->json(['status' => 'ingested']);
    }

    protected function checkThresholds(array $reading)
    {
        // Simple threshold check logic
        // If moisture < 20% -> emit Kafka alert: sensor.alert
    }

    public function getHistory($fieldId)
    {
        // Retrieve time-series data for the graph
        $data = DB::table('sensor_readings')
            ->where('field_id', $fieldId)
            ->orderBy('time', 'desc')
            ->limit(50)
            ->get();

        return response()->json($data);
    }
}
