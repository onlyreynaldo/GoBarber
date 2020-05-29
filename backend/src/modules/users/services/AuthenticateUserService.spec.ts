import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeHashProvider = new FakeHashProvider

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const user = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await user.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    const response = await authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123321'
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with none existing user', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeHashProvider = new FakeHashProvider

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123321'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeHashProvider = new FakeHashProvider

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const user = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await user.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
});
