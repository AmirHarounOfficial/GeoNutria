import pika
import json
import requests
import os
import time

class BaseAIWorker:
    def __init__(self, queue_name):
        self.queue_name = queue_name
        self.orchestrator_url = os.getenv('ORCHESTRATOR_URL', 'http://ai-orchestrator')
        self.connection = None
        self.channel = None

    def connect(self):
        host = os.getenv('RABBIT_HOST', 'localhost')
        port = int(os.getenv('RABBIT_PORT', 5672))
        credentials = pika.PlainCredentials(
            os.getenv('RABBIT_USER', 'guest'),
            os.getenv('RABBIT_PASSWORD', 'guest')
        )
        
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=host, port=port, credentials=credentials)
        )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=self.queue_name, durable=True)

    def start_consuming(self, callback):
        print(f" [*] Waiting for messages in {self.queue_name}. To exit press CTRL+C")
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=callback)
        self.channel.start_consuming()

    def report_result(self, job_id, status, result=None, error=None):
        url = f"{self.orchestrator_url}/api/v1/internal/jobs/{job_id}/result"
        payload = {
            'status': status,
            'result': result,
            'error': error
        }
        try:
            response = requests.put(url, json=payload)
            print(f" [x] Reported {status} for {job_id}: {response.status_code}")
        except Exception as e:
            print(f" [!] Failed to report result: {e}")

    def run_inference(self, data):
        # To be implemented by child classes
        raise NotImplementedError
