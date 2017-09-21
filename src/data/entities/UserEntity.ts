import {Entity, Column, PrimaryColumn, ColumnOptions} from "typeorm";
import {EntityBase} from "../../common/EntityBase";
const uuid = require("uuid");

@Entity("user")
export class UserEntity extends EntityBase {
    @PrimaryColumn({name: "id", length: "36"} as ColumnOptions)
    id: string = uuid();

    @Column({name: "name", length: "50", nullable: true})
    name: string;

    @Column({name: "phone_number", length: "11"})
    phoneNumber: string;

    @Column({name: "password", length: "255", nullable: true})
    password: string;

    @Column({name: "password_format", length: "32", nullable: true})
    passwordFormat: string;

    @Column({name: "created_at", type: "datetime", nullable: true})
    createdAt: Date;

    @Column({name: "last_updated_at", type: "datetime", nullable: true})
    lastUpdatedAt?: Date;

    @Column({name: "last_login_at", type: "datetime", nullable: false})
    lastLoginAt: Date;

    @Column({name: "avatar", length: "512", nullable: true})
    avatar: string;

    @Column({name: "qq", length: "32", nullable: true})
    qq: string;

    @Column({name: "we_chat", length: "64", nullable: true})
    weChat: string;

    @Column({name: "description", length: "255", nullable: true})
    description: string;
}