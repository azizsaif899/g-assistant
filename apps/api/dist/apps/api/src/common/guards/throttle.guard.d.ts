import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ThrottleGuard implements CanActivate {
    private requests;
    private readonly maxRequests;
    private readonly windowMs;
    canActivate(context: ExecutionContext): boolean;
}
