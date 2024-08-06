import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";
import Appointment from "../entities/Appointment";


export const getAllAppointments = async(req: Request, res: Response) => {
  const allApointments: Appointment[] = await getAllAppointmentsService();
  res.status(200).json(allApointments);
};

export const getAppointmentById = async(req: Request, res: Response) => {
  const { appId } = req.params;
  try {
    const foundAppointment = await getAppointmentByIdService(Number(appId));
    res.status(200).json(foundAppointment);
  } catch (error:any) {
    res.status(400).json({error:error.message})
  }
};

export const schedule = async(req: Request, res: Response) => {
  const {date, time, userId, description, status } = req.body;
  try {
  const newAppointment: Appointment = await createAppointmentService({
    date, 
    time, 
    userId,
    description,
    status
    });
  res.status(200).json(newAppointment);
  }
   catch (error:any) {
    res.status(400).json({error:error})
  }
  
}

export const cancel = async(req: Request, res: Response) => {
  const {appId} = req.params
  try {
    await cancelAppointmentService(Number(appId))
    res.status(200).json({message:'Turno cancelado'});
  } catch (error:any) {
    res.status(400).json({message:error.message})
  }
  
};