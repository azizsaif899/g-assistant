import { Request, Response } from 'express';
export declare class WebhookController {
    private pubsub;
    private topicName;
    handleWebhook(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private validateWebhook;
    private validateMetaWebhook;
    private validateOdooWebhook;
    private unifyPayload;
    private getEventType;
    private extractLeadData;
    private publishToQueue;
}
