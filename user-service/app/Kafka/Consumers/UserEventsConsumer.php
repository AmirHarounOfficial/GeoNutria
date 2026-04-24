<?php

namespace App\Kafka\Consumers;

use App\Models\Profile;
use App\Models\Farm;
use Illuminate\Support\Str;
use Junges\Kafka\Contracts\KafkaConsumerMessage;
use Junges\Kafka\Contracts\Handler;

class UserEventsConsumer implements Handler
{
    public function __invoke(KafkaConsumerMessage $message)
    {
        $body = $message->getBody();
        $event = $body['event'] ?? null;

        if ($event === 'user.created') {
            $this->handleUserCreated($body);
        }
    }

    protected function handleUserCreated(array $data)
    {
        Profile::create([
            'id' => (string) Str::uuid(),
            'user_id' => $data['user_id'],
            'full_name' => $data['full_name'],
            'email' => $data['email'],
        ]);

        Farm::create([
            'id' => (string) Str::uuid(),
            'user_id' => $data['user_id'],
            'name' => $data['farm_name'],
        ]);
    }
}
