export declare class CFOAgent {
    private name;
    private capabilities;
    processQuery(query: string): Promise<string>;
    getCapabilities(): string[];
    getStatus(): {
        active: boolean;
        name: string;
    };
}
