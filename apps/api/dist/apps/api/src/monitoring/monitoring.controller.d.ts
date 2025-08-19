import { MonitoringService } from './monitoring.service';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    getHealth(): {
        status: string;
        timestamp: Date;
        metrics: {
            cpu: any;
            memory: any;
            responseTime: any;
        };
    };
    getMetrics(name?: string, since?: string): any;
    getAlerts(level?: string, resolved?: string): any;
    getPerformanceReport(hours?: string): any;
    getBenchmarks(): any;
    getErrorAnalysis(hours?: string): any;
    getUsageReport(): any;
    getBackupStatus(): any;
    getDetailedHealth(): any;
}
