"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByCredentiaId = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = exports.userModel = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = __importDefault(require("../entities/User"));
const credentialService_1 = require("./credentialService");
exports.userModel = data_source_1.AppDataSource.getRepository(User_1.default);
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield exports.userModel.find({
        relations: { appointments: true }
    });
    return allUsers;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield exports.userModel.findOne({
        where: { id }, relations: ['appointments']
    });
    if (!foundUser)
        throw Error('Usuario no encontrado');
    return foundUser;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = exports.userModel.create(createUserDto);
    const newCredential = yield (0, credentialService_1.createCredential)({
        username: createUserDto.username,
        password: createUserDto.password
    });
    yield exports.userModel.save(newUser);
    newUser.credential = newCredential;
    yield exports.userModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const findUserByCredentiaId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield exports.userModel.findOneBy({ credential: { id: credentialId } });
    return foundUser;
});
exports.findUserByCredentiaId = findUserByCredentiaId;
