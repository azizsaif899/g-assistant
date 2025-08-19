export declare class WhatsAppService {
    private whatsappCore;
    private userManager;
    private securityManager;
    constructor();
    verifyWebhook(mode: string, token: string, challenge: string): string | null;
    processWebhook(body: any, signature: string): Promise<void>;
    authenticateUser(whatsappId: string, systemUserId?: string): Promise<boolean>;
    isUserAuthenticated(whatsappId: string): boolean;
}
