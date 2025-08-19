interface Command {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
}
interface CommandExecution {
    commandId: string;
    parameters?: any;
}
export declare class CommandsController {
    private commands;
    getContextualCommands(path: string): Promise<{
        commands: Command[];
    }>;
    executeCommand(execution: CommandExecution): Promise<{
        success: boolean;
        result?: any;
    }>;
    executeSequence(executions: CommandExecution[]): Promise<{
        success: boolean;
        results: any[];
    }>;
    private performCommand;
}
export {};
