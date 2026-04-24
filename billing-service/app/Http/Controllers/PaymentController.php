<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function initiatePaymob(Request $request)
    {
        // 1. Authenticate with Paymob
        // 2. Register Order
        // 3. Generate Payment Key
        // Return payment_token for frontend iframe/SDK
        return response()->json([
            'payment_token' => 'mock_paymob_token_' . Str::random(16),
            'iframe_url' => 'https://accept.paymob.com/api/acceptance/iframes/123?payment_token=...'
        ]);
    }

    public function initiateMoyasar(Request $request)
    {
        // Return publishable key and metadata for Moyasar SDK
        return response()->json([
            'publishable_key' => env('MOYASAR_PUB_KEY'),
            'amount' => $request->amount,
            'callback_url' => url('/api/v1/payments/moyasar/callback')
        ]);
    }

    public function handlePaymob(Request $request)
    {
        // Paymob HMAC validation would go here
        $success = $request->input('success');
        $userId = $request->input('obj.order.merchant_order_id'); // Using merchant_order_id as user_id for simplicity or mapping
        $amount = $request->input('obj.amount_cents') / 100;
        
        if ($success === "true") {
            return $this->creditUser($userId, $amount, 'paymob');
        }

        return response()->json(['status' => 'failure'], 400);
    }

    public function handleMoyasar(Request $request)
    {
        // Moyasar Signature validation would go here
        $status = $request->input('data.status');
        $userId = $request->input('data.metadata.user_id');
        $amount = $request->input('data.amount') / 100;

        if ($status === 'paid') {
            return $this->creditUser($userId, $amount, 'moyasar');
        }

        return response()->json(['status' => 'failure'], 400);
    }

    protected function creditUser($userId, $amount, $gateway)
    {
        // For GeoNutria, we convert money to credits
        // Example: 1 SAR/EGP = 10 Credits (adjust as needed)
        $creditsToAdd = $amount * 10;

        return DB::transaction(function () use ($userId, $creditsToAdd, $gateway) {
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $userId],
                ['id' => (string) Str::uuid(), 'balance' => 0]
            );

            $wallet->balance += $creditsToAdd;
            $wallet->total_earned += $creditsToAdd;
            $wallet->save();

            Transaction::create([
                'id' => (string) Str::uuid(),
                'wallet_id' => $wallet->id,
                'user_id' => $userId,
                'type' => 'addition',
                'amount' => $creditsToAdd,
                'balance_after' => $wallet->balance,
                'description' => "Credit purchase via {$gateway}",
            ]);

            return response()->json(['status' => 'success', 'balance' => $wallet->balance]);
        });
    }
}
