<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Farm;
use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class FarmController extends Controller
{
    public function index(Request $request)
    {
        $farms = Farm::where('user_id', $request->user_id)->get();
        return response()->json($farms);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $farm = Farm::create([
            'id' => (string) Str::uuid(),
            'user_id' => $request->user_id,
            'name' => $request->name,
            'size_hectares' => $request->size_hectares,
            'location' => $request->location,
        ]);

        return response()->json($farm, 201);
    }

    public function show($id)
    {
        $farm = Farm::find($id);
        if (!$farm) return response()->json(['message' => 'Farm not found'], 404);
        return response()->json($farm);
    }

    public function update(Request $request, $id)
    {
        $farm = Farm::find($id);
        if (!$farm) return response()->json(['message' => 'Farm not found'], 404);

        $farm->update($request->only(['name', 'size_hectares', 'location', 'latitude', 'longitude']));
        return response()->json($farm);
    }

    public function destroy($id)
    {
        $farm = Farm::find($id);
        if (!$farm) return response()->json(['message' => 'Farm not found'], 404);
        $farm->delete();
        return response()->json(['message' => 'Farm deleted']);
    }
}
