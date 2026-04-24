<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Farm;
use App\Models\Field;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{
    public function index($farmId)
    {
        $fields = Field::where('farm_id', $farmId)->get();
        return response()->json($fields);
    }

    public function store(Request $request, $farmId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $field = Field::create([
            'id' => (string) Str::uuid(),
            'farm_id' => $farmId,
            'name' => $request->name,
            'size_hectares' => $request->size_hectares,
            'crop_type' => $request->crop_type,
            'zone' => $request->zone,
            'status' => 'healthy',
        ]);

        return response()->json($field, 201);
    }

    public function show($farmId, $id)
    {
        $field = Field::where('farm_id', $farmId)->where('id', $id)->first();
        if (!$field) return response()->json(['message' => 'Field not found'], 404);
        return response()->json($field);
    }

    public function update(Request $request, $farmId, $id)
    {
        $field = Field::where('farm_id', $farmId)->where('id', $id)->first();
        if (!$field) return response()->json(['message' => 'Field not found'], 404);

        $field->update($request->only(['name', 'size_hectares', 'crop_type', 'zone', 'status']));
        return response()->json($field);
    }

    public function destroy($farmId, $id)
    {
        $field = Field::where('farm_id', $farmId)->where('id', $id)->first();
        if (!$field) return response()->json(['message' => 'Field not found'], 404);
        $field->delete();
        return response()->json(['message' => 'Field deleted']);
    }
}
