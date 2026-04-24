<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Field;
use App\Models\Sensor;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class SensorCRUDController extends Controller
{
    public function index($fieldId)
    {
        $sensors = Sensor::where('field_id', $fieldId)->get();
        return response()->json($sensors);
    }

    public function store(Request $request, $fieldId)
    {
        $validator = Validator::make($request->all(), [
            'sensor_external_id' => 'required|string|unique:sensors',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $sensor = Sensor::create([
            'id' => (string) Str::uuid(),
            'field_id' => $fieldId,
            'sensor_external_id' => $request->sensor_external_id,
            'type' => $request->type,
            'status' => 'offline',
        ]);

        return response()->json($sensor, 201);
    }

    public function show($fieldId, $id)
    {
        $sensor = Sensor::where('field_id', $fieldId)->where('id', $id)->first();
        if (!$sensor) return response()->json(['message' => 'Sensor not found'], 404);
        return response()->json($sensor);
    }

    public function update(Request $request, $fieldId, $id)
    {
        $sensor = Sensor::where('field_id', $fieldId)->where('id', $id)->first();
        if (!$sensor) return response()->json(['message' => 'Sensor not found'], 404);

        $sensor->update($request->only(['field_id', 'type', 'status']));
        return response()->json($sensor);
    }

    public function destroy($fieldId, $id)
    {
        $sensor = Sensor::where('field_id', $fieldId)->where('id', $id)->first();
        if (!$sensor) return response()->json(['message' => 'Sensor not found'], 404);
        $sensor->delete();
        return response()->json(['message' => 'Sensor deleted']);
    }
}
