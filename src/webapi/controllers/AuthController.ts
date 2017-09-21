import "reflect-metadata";
import {JsonController, Get, Post, Param} from "routing-controllers";
import {Service, Container} from "typedi";
import {signJwt} from "../utils";
import {Checker} from "../../common/Checkers";
import {UserRepository} from "../../data/UserRepository";
import {UserEntity} from "../../data/entities/UserEntity";
import {OrmCustomRepository} from "typeorm-typedi-extensions";

@Service()
@JsonController("/auth")
export class AuthController {
    constructor(@OrmCustomRepository(UserRepository) private readonly m_userRepository: UserRepository) {
    }

    @Post("/token/:phonenumber")
    public async token(
        @Param("phonenumber") phoneNumber: string
    ) {
        const checker = new Checker<UserEntity, UserRepository>();
        let check = await checker.notExistCheck({phoneNumber}, this.m_userRepository, null, false);
        if (check) await this.m_userRepository.createUserByPhoneNumber(phoneNumber);

        const token = await signJwt({phoneNumber}, "1h", "RS256");
        return token;
    }

}