export declare class MonitoringService {
    private metricsCollector;
    private alertManager;
    private performanceAnalyzer;
    private notificationService;
    private benchmarkService;
    private logAnalyzer;
    private usageTracker;
    private backupManager;
    private healthChecker;
    constructor();
    private initializeMetrics;
    private initializeAlerts;
    recordMetric(name: string, value: number, tags?: Record<string, string>): void;
    getHealthStatus(): {
        status: string;
        timestamp: Date;
        metrics: {
            cpu: any;
            memory: any;
            responseTime: any;
        };
    };
    getMetrics(name?: string, since?: Date): any;
    getAlerts(level?: any, resolved?: boolean): any;
    getPerformanceReport(hours?: number): any;
    private initializeNotifications;
    private initializeBenchmarks;
    private initializeHealthChecks;
    getBenchmarks(): any;
    getErrorAnalysis(hours?: number): any;
    getUsageReport(): any;
    getBackupStatus(): any;
    getDetailedHealthStatus(): any;
}
