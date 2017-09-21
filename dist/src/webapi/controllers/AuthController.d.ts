import "reflect-metadata";
import { UserRepository } from "../../data/UserRepository";
export declare class AuthController {
    private readonly m_userRepository;
    constructor(m_userRepository: UserRepository);
    token(phoneNumber: string): Promise<string>;
}
