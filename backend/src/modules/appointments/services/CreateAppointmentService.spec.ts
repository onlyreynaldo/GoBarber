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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 6, 10, 13),
      user_id: '123321',
      provider_id: '123411231'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123411231');
  });

  it('should not be able to create two appointment on the same time', async () => {

    const appoitmentDate = new Date(2020, 6, 29, 11);

    await createAppointment.execute({
      date: appoitmentDate,
      user_id: '123321',
      provider_id: '123411231'
    });

    await expect(createAppointment.execute({
      date: appoitmentDate,
      user_id: '123321',
      provider_id: '123411231'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123321',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment with same user as provider ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123321',
      provider_id: '123321'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment before 8am and after 5pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '123321',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '123321',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });
});

