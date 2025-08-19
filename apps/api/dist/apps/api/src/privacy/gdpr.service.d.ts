export declare class GDPRService {
    exportUserData(userId: string): Promise<any>;
    deleteUserData(userId: string): Promise<void>;
    getUserConsent(userId: string): Promise<any>;
}
