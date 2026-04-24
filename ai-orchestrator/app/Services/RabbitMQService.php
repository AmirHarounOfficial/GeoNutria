<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    protected $connection;
    protected $channel;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection(
            env('RABBIT_HOST', '127.0.0.1'),
            env('RABBIT_PORT', 5672),
            env('RABBIT_USER', 'guest'),
            env('RABBIT_PASSWORD', 'guest')
        );
        $this->channel = $this->connection->channel();
    }

    public function publishJob(string $queue, array $data)
    {
        $this->channel->queue_declare($queue, false, true, false, false);

        $msg = new AMQPMessage(
            json_encode($data),
            ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]
        );

        $this->channel->basic_publish($msg, '', $queue);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
