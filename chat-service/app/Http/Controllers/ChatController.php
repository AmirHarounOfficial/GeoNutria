<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatSession;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    public function start(Request $request)
    {
        $session = ChatSession::create([
            'id' => (string) Str::uuid(),
            'user_id' => $request->input('user_id'),
            'title' => $request->input('title', 'New Chat'),
            'context' => $request->input('context', []), // e.g. last diagnosis
        ]);

        return response()->json($session);
    }

    public function message(Request $request, $id)
    {
        $session = ChatSession::find($id);
        if (!$session) return response()->json(['message' => 'Session not found'], 404);

        $userMessage = $request->input('message');

        // 1. Deduct 1 credit via Billing Service
        $billingUrl = env('BILLING_SERVICE_URL', 'http://billing-service');
        $creditResponse = Http::post("{$billingUrl}/api/v1/credits/deduct", [
            'user_id' => $session->user_id,
            'feature' => 'chat_message',
            'cost' => 1
        ]);

        if ($creditResponse->failed()) {
            return response()->json(['message' => 'Insufficient credits'], 402);
        }

        // 2. Format LLM Prompt with context
        $history = $session->context; // array of previous messages
        $systemPrompt = "You are a senior agronomist at GeoNutria. Assist the user based on their farm history.";
        
        // 3. Call LLM (Placeholder for OpenAI/Groq)
        // $aiResponse = $llmService->chat($systemPrompt, $history, $userMessage);
        $aiResponse = "Based on your last soil scan ($0.8 nitrogen), I recommend adding natural compost to Field B.";

        // Update context
        $newHistory = array_merge($history, [
            ['role' => 'user', 'content' => $userMessage],
            ['role' => 'assistant', 'content' => $aiResponse]
        ]);
        $session->update(['context' => $newHistory]);

        return response()->json([
            'response' => $aiResponse,
            'session_id' => $id
        ]);
    }
}
