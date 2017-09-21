import {UserEntity} from "../../data/entities/UserEntity";

export class UserModel {
    id: string;
    name?: string;
    phoneNumber: string;
    createdAt: Date;
    qq?: string;
    weChat: string;
    description: string;

    assignFrom(arg: UserEntity): UserModel {
        let result = new UserModel();
        result.id = arg.id;
        result.createdAt = arg.createdAt;
        result.name = arg.name;
        result.phoneNumber = arg.phoneNumber;
        result.qq = arg.qq;
        result.weChat = arg.weChat;
        result.description = arg.description;
        return result;
    }
}


