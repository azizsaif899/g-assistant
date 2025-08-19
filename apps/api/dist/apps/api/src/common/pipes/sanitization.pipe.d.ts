import { PipeTransform } from '@nestjs/common';
export declare class SanitizationPipe implements PipeTransform {
    transform(value: any): any;
    private sanitizeString;
    private sanitizeObject;
}
