<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function show($userId)
    {
        $profile = Profile::where('user_id', $userId)->first();
        if (!$profile) return response()->json(['message' => 'Profile not found'], 404);
        return response()->json($profile);
    }

    public function update(Request $request, $userId)
    {
        $profile = Profile::where('user_id', $userId)->first();
        if (!$profile) return response()->json(['message' => 'Profile not found'], 404);

        $validator = Validator::make($request->all(), [
            'full_name' => 'string|max:255',
            'phone' => 'string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $profile->update($request->only(['full_name', 'avatar_url', 'phone', 'location', 'language']));
        return response()->json($profile);
    }
}
