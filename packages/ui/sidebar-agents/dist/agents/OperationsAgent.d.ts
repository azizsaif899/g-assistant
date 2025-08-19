export declare class OperationsAgent {
    private name;
    private capabilities;
    processQuery(query: string): Promise<string>;
    getCapabilities(): string[];
    getStatus(): {
        active: boolean;
        name: string;
    };
}
