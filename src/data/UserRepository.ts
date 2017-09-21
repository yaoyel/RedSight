import {Repository, EntityRepository, TransactionEntityManager} from "typeorm";
import {Service} from "typedi";
import {UserEntity} from "./entities/UserEntity";
import {CreateUserModel} from "./models/CreateUserModel";
import {UserUtils} from "./utils/UserUtils";
import {RedSightError} from "../common/RedSightError";

@Service()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    public findByPhoneNumber(phoneNumber: string): Promise<UserEntity> {
        return this.findOne({phoneNumber});
    }

    @TransactionEntityManager()
    public async createUserAsync(user: CreateUserModel): Promise<UserEntity> {
        let userEntity = new UserEntity();
        userEntity.createdAt = new Date();
        userEntity.name = user.name;
        const passwordWithSalt = UserUtils.signPassword(user.password);
        userEntity.password = passwordWithSalt.password;
        userEntity.passwordFormat = passwordWithSalt.salt;
        userEntity.phoneNumber = user.phoneNumber;
        userEntity.lastLoginAt = new Date();

        await this.persist(userEntity);

        return userEntity;

    }

    @TransactionEntityManager()
    public async updateUserAsync(user: UserEntity): Promise<void> {
        await this.persist(user);
    }

    @TransactionEntityManager()
    public async createUserByPhoneNumber(phoneNnumber: string) {
        const user = new UserEntity();
        user.phoneNumber = phoneNnumber;
        user.createdAt = new Date();
        user.lastLoginAt = new Date();

        await this.persist(user);

    }

    @TransactionEntityManager()
    public async resetPasswordAsync(user: UserEntity, newPassword: string) {
        if (!!user) throw new RedSightError("用户不能为空");

        const passwordWithSalt = UserUtils.signPassword(user.password);
        user.password = passwordWithSalt.password;
        user.passwordFormat = passwordWithSalt.salt;
        await this.persist(user);
    }
}