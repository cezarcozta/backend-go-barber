import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to user update his avatar', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar.jpg',
    });

    expect(user.avatar).toBe('fakeAvatar.jpg');
  });

  it('should not be able to update non user existing avatar', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'fakeAvatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when is updating the new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('fakeAvatar.jpg');

    expect(user.avatar).toBe('fakeAvatar2.jpg');
  });
});
