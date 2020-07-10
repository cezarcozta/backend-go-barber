"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUserRepository, fakeStorageProvider);
  });
  it('should be able to user update his avatar', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar.jpg'
    });
    expect(user.avatar).toBe('fakeAvatar.jpg');
  });
  it('should not be able to update non user existing avatar', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'fakeAvatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when is updating the new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('fakeAvatar.jpg');
    expect(user.avatar).toBe('fakeAvatar2.jpg');
  });
});