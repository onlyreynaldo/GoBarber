import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository =  new FakeAppointmentsRepository;

    const createAppoitment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppoitment.execute({
      date: new Date(),
      provider_id: '123411231'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123411231');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository =  new FakeAppointmentsRepository;

    const createAppoitment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appoitmentDate = new Date(2020, 4, 29, 11);

    await createAppoitment.execute({
      date: appoitmentDate,
      provider_id: '123411231'
    });

    expect(createAppoitment.execute({
      date: appoitmentDate,
      provider_id: '123411231'
    })).rejects.toBeInstanceOf(AppError)
  });
});
