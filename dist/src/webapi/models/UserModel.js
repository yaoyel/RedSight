"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    assignFrom(arg) {
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
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map