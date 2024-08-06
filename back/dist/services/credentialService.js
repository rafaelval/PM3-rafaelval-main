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
exports.validateCredential = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = __importDefault(require("../entities/Credential"));
const credentialModel = data_source_1.AppDataSource.getRepository(Credential_1.default);
const createCredential = (createCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = credentialModel.create(createCredentialDto);
    yield credentialModel.save(newCredential);
    return newCredential;
});
exports.createCredential = createCredential;
const validateCredential = (validateCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = validateCredentialDto;
    const foundCredential = yield credentialModel.findOneBy({ username });
    if (!foundCredential)
        throw Error('usuario no encontrado');
    if (password !== foundCredential.password)
        throw Error('password incorrecto');
    return foundCredential;
});
exports.validateCredential = validateCredential;
