<?php

namespace App\Kafka\Consumers;

use Junges\Kafka\Contracts\KafkaConsumerMessage;
use Junges\Kafka\Contracts\Handler;
use App\Models\Notification;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIEventsConsumer implements Handler
{
    public function __invoke(KafkaConsumerMessage $message)
    {
        $body = $message->getBody();
        $event = $body['event'] ?? null;
        $userId = $body['user_id'] ?? null;
        $type = $body['type'] ?? 'analysis';

        if ($event === 'ai.completed') {
            $this->sendPushNotification(['user_id' => $userId, 'job_type' => $type]);
        } elseif ($event === 'ai.failed') {
            $this->sendPushNotification(['user_id' => $userId, 'job_type' => $type]);
        }
    }

    protected function sendPushNotification(array $data)
    {
        $userId = $data['user_id'] ?? null;
        $title = "AI Analysis Ready";
        $body = "Your scan for {$data['job_type']} is complete. Click to view results.";

        // 1. Save to database for history
        Notification::create([
            'id' => (string) Str::uuid(),
            'user_id' => $userId,
            'title' => $title,
            'body' => $body,
            'data' => $data,
        ]);

        Log::info("Sending push to user {$userId}: {$title}");

        // 2. Fetch user profile/FCM token from User Service
        // $userServiceUrl = env('USER_SERVICE_URL');
        // $userToken = Http::get("{$userServiceUrl}/api/internal/users/{$userId}/fcm-token")->json('token');

        // 3. Dispatch to Google FCM API
        // if ($userToken) { ... }
    }
}
