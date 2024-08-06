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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.schedule = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allApointments = yield (0, appointmentService_1.getAllAppointmentsService)();
    res.status(200).json(allApointments);
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appId } = req.params;
    try {
        const foundAppointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(appId));
        res.status(200).json(foundAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAppointmentById = getAppointmentById;
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId, description, status } = req.body;
    try {
        const newAppointment = yield (0, appointmentService_1.createAppointmentService)({
            date,
            time,
            userId,
            description,
            status
        });
        res.status(200).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.schedule = schedule;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json({ message: 'Turno cancelado' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.cancel = cancel;
