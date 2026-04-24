<?php

namespace App\Kafka\Consumers;

use Junges\Kafka\Contracts\KafkaConsumerMessage;
use Junges\Kafka\Contracts\Handler;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class AIResultConsumer implements Handler
{
    public function __invoke(KafkaConsumerMessage $message)
    {
        $body = $message->getBody();
        $event = $body['event'] ?? null;

        if ($event === 'ai.completed') {
            $this->updateFieldStats($body);
        }
    }

    protected function updateFieldStats(array $data)
    {
        // For GeoNutria, we aggregate health scores per field
        // This is where real-time streaming updates happen for the dashboard
        Log::info("Updating dashboard stats for Field: {$data['job_id']}");
        
        // Mock update: field health score = 90%
        // DB::table('field_stats')->updateOrInsert(...)
    }
}
