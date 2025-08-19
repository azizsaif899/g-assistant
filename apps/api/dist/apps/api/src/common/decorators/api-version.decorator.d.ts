export declare const API_VERSION_KEY = "apiVersion";
export declare const ApiVersion: (version: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const DEPRECATED_KEY = "deprecated";
export declare const Deprecated: (deprecationDate?: string, alternativeEndpoint?: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
