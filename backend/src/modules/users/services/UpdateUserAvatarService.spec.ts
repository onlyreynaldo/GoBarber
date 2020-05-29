import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeStorageProvider =  new FakeStorageProvider;

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  });

  it('should not be able to update avatar with non existing user', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeStorageProvider =  new FakeStorageProvider;

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository =  new FakeUsersRepository;
    const fakeStorageProvider =  new FakeStorageProvider;

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123321'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
