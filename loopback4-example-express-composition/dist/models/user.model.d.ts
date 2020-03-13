import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: string;
    googleID?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    email?: string;
    constructor(data?: Partial<User>);
}
export declare const user: import("json-schema").JSONSchema6;
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
