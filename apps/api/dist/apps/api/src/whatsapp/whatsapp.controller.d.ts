import { WhatsAppService } from './whatsapp.service';
export declare class WhatsAppController {
    private readonly whatsappService;
    constructor(whatsappService: WhatsAppService);
    verifyWebhook(mode: string, token: string, challenge: string): string;
    handleWebhook(body: any, signature: string): Promise<{
        status: string;
    }>;
}
