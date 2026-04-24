<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class CreditController extends Controller
{
    public function check(Request $request)
    {
        $userId = $request->input('user_id');
        $cost = $request->input('cost', 0);

        $wallet = Wallet::where('user_id', $userId)->first();

        if (!$wallet) {
            return response()->json(['sufficient' => false, 'message' => 'Wallet not found'], 404);
        }

        return response()->json([
            'sufficient' => $wallet->balance >= $cost,
            'balance' => $wallet->balance,
            'cost' => $cost
        ]);
    }

    public function deduct(Request $request)
    {
        $userId = $request->input('user_id');
        $cost = $request->input('cost');
        $feature = $request->input('feature');
        $referenceId = $request->input('reference_id');

        // Redis Lock to prevent race conditions during concurrent requests
        $lockKey = "wallet_lock:{$userId}";
        $lock = Redis::set($lockKey, true, 'EX', 10, 'NX');

        if (!$lock) {
            return response()->json(['message' => 'Wallet is busy, try again'], 429);
        }

        try {
            return DB::transaction(function () use ($userId, $cost, $feature, $referenceId) {
                $wallet = Wallet::where('user_id', $userId)->lockForUpdate()->first();

                if (!$wallet) {
                    throw new \Exception('Wallet not found');
                }

                if ($wallet->balance < $cost) {
                    throw new \Exception('Insufficient credits');
                }

                $wallet->balance -= $cost;
                $wallet->total_spent += $cost;
                $wallet->save();

                Transaction::create([
                    'id' => (string) Str::uuid(),
                    'wallet_id' => $wallet->id,
                    'user_id' => $userId,
                    'type' => 'deduction',
                    'amount' => $cost,
                    'balance_after' => $wallet->balance,
                    'feature' => $feature,
                    'reference_id' => $referenceId,
                ]);

                // 5. Log usage
                DB::table('usage_logs')->insert([
                    'id' => (string) Str::uuid(),
                    'user_id' => $userId,
                    'feature' => $feature,
                    'credits_spent' => $cost,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                return response()->json([
                    'status' => 'success',
                    'balance' => $wallet->balance,
                    'deducted' => $cost
                ]);
            });
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } finally {
            Redis::del($lockKey);
        }
    }
}
