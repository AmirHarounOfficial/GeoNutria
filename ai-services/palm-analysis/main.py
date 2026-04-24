from common.base_worker import BaseAIWorker
import json
import time

class PalmAnalysisWorker(BaseAIWorker):
    def __init__(self):
        super().__init__('ai.palm_analysis')

    def process_message(self, ch, method, properties, body):
        print(f" [x] Received {body}")
        data = json.loads(body)
        job_id = data.get('job_id')

        try:
            # Simulate ML Inference
            time.sleep(2) 
            result = {
                'total_palms': 150,
                'health_status': {'healthy': 142, 'stressed': 8},
                'pests_detected': 'Red Palm Weevil detected in 3 trees'
            }
            
            self.report_result(job_id, 'completed', result=result)
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            self.report_result(job_id, 'failed', error=str(e))
            ch.basic_ack(delivery_tag=method.delivery_tag)

if __name__ == "__main__":
    worker = PalmAnalysisWorker()
    worker.connect()
    worker.start_consuming(worker.process_message)
