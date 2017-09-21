import { UserEntity } from "../../data/entities/UserEntity";
export declare class UserModel {
    id: string;
    name?: string;
    phoneNumber: string;
    createdAt: Date;
    qq?: string;
    weChat: string;
    description: string;
    assignFrom(arg: UserEntity): UserModel;
}
