export declare class DocumentController {
    analyzeDocument(file: Express.Multer.File, query?: string): Promise<{
        success: boolean;
        analysis: string;
        query: string;
        fileSize: any;
        mimeType: any;
    }>;
    analyzeUrl(url: string, query?: string): Promise<{
        success: boolean;
        analysis: string;
        query: string;
    }>;
}
