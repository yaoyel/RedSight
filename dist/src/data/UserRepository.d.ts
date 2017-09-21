import { Repository } from "typeorm";
import { UserEntity } from "./entities/UserEntity";
import { CreateUserModel } from "./models/CreateUserModel";
export declare class UserRepository extends Repository<UserEntity> {
    findByPhoneNumber(phoneNumber: string): Promise<UserEntity>;
    createUserAsync(user: CreateUserModel): Promise<UserEntity>;
    updateUserAsync(user: UserEntity): Promise<void>;
    createUserByPhoneNumber(phoneNnumber: string): Promise<void>;
    resetPasswordAsync(user: UserEntity, newPassword: string): Promise<void>;
}
