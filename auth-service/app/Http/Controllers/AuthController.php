<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Junges\Kafka\Facades\Kafka;
use Junges\Kafka\Message\Message;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'farmName' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'id' => (string) Str::uuid(),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'owner',
        ]);

        // Publish event to Kafka: user.created
        // This will be consumed by User Service to create a profile and Farm
        Kafka::publishOn('user.events')
            ->withMessage(new Message(
                body: [
                    'event' => 'user.created',
                    'user_id' => $user->id,
                    'full_name' => $request->name,
                    'email' => $user->email,
                    'farm_name' => $request->farmName,
                ]
            ))
            ->send();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $otp = rand(100000, 999999);
        // Save to otp_codes table
        DB::table('otp_codes')->updateOrInsert(
            ['email' => $request->email],
            ['code' => $otp, 'expires_at' => now()->addMinutes(10)]
        );

        // Dispath event to Kafka for Notification Service to send email/SMS
        Kafka::publishOn('notification.events')
            ->withMessage(new Message(
                body: [
                    'event' => 'otp.created',
                    'email' => $request->email,
                    'code' => $otp,
                ]
            ))
            ->send();

        return response()->json(['message' => 'OTP sent successfully']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|numeric',
        ]);

        $otpCode = DB::table('otp_codes')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->first();

        if (!$otpCode) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        DB::table('otp_codes')->where('email', $request->email)->delete();

        return response()->json(['message' => 'OTP verified successfully']);
    }
}
