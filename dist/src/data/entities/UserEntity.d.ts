import { EntityBase } from "../../common/EntityBase";
export declare class UserEntity extends EntityBase {
    id: string;
    name: string;
    phoneNumber: string;
    password: string;
    passwordFormat: string;
    createdAt: Date;
    lastUpdatedAt?: Date;
    lastLoginAt: Date;
    avatar: string;
    qq: string;
    weChat: string;
    description: string;
}
