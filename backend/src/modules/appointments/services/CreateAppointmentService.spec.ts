import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    )
  });

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123411231'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123411231');
  });

  it('should not be able to create two appointments on the same time', async () => {

    const appoitmentDate = new Date(2020, 4, 29, 11);

    await createAppointment.execute({
      date: appoitmentDate,
      provider_id: '123411231'
    });

    expect(createAppointment.execute({
      date: appoitmentDate,
      provider_id: '123411231'
    })).rejects.toBeInstanceOf(AppError)
  });
});
