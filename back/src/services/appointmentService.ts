import { AppDataSource } from "../config/data-source";
import Appointment from "../entities/Appointment";
import User from "../entities/User";
import { userModel } from "./userService";

interface AppoinmentDto {
  date: string;
  time: string;
  userId: number;
  description:string;
  status:"active";
}

const appointmentModel = AppDataSource.getRepository(Appointment);


export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const AllAppointments: Appointment[] = await appointmentModel.find();
  return AllAppointments;
};

export const getAppointmentByIdService = async (
  appId: number
): Promise<Appointment> => {
  const foundAppointment: Appointment | null = await appointmentModel.findOneBy(
    {
      id: appId,
    }
  );
  if (!foundAppointment) throw Error("Turno no encontrado");
  return foundAppointment;
};

export const createAppointmentService = async (
  AppoinmentDto: AppoinmentDto
): Promise<Appointment> => {

  const newAppointment: Appointment = appointmentModel.create(AppoinmentDto);
  await appointmentModel.save(newAppointment);

  const user: User | null = await userModel.findOneBy({
    id: AppoinmentDto.userId,
  });

  if (!user) throw Error("Usuario no existente");
  newAppointment.user = user;

  await appointmentModel.save(newAppointment);
  return newAppointment;
};

export const cancelAppointmentService = async (
  appId: number
): Promise<void> => {
  const newAppointment: Appointment | null = await appointmentModel.findOneBy({
    id: appId,
  });
  if (!newAppointment) throw Error("Turno inexistente");
  newAppointment.status = "cancelled";
  await appointmentModel.save(newAppointment);
};
