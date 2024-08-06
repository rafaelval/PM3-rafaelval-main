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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const userService_1 = require("./userService");
const appointmentModel = data_source_1.AppDataSource.getRepository(Appointment_1.default);
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const AllAppointments = yield appointmentModel.find();
    return AllAppointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (appId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield appointmentModel.findOneBy({
        id: appId,
    });
    if (!foundAppointment)
        throw Error("Turno no encontrado");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (AppoinmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = appointmentModel.create(AppoinmentDto);
    yield appointmentModel.save(newAppointment);
    const user = yield userService_1.userModel.findOneBy({
        id: AppoinmentDto.userId,
    });
    if (!user)
        throw Error("Usuario no existente");
    newAppointment.user = user;
    yield appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (appId) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield appointmentModel.findOneBy({
        id: appId,
    });
    if (!newAppointment)
        throw Error("Turno inexistente");
    newAppointment.status = "cancelled";
    yield appointmentModel.save(newAppointment);
});
exports.cancelAppointmentService = cancelAppointmentService;
