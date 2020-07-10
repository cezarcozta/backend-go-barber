"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let updateUserProfile;
describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateUserProfile = new _UpdateProfileService.default(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John TrÊ',
      email: 'johntre@exemple.com',
      // password: '123456',
      old_password: '123456'
    });
    expect(updatedUser.name).toBe('John TrÊ');
    expect(updatedUser.email).toBe('johntre@exemple.com');
  });
  it('should not be able to update to another user email', async () => {
    await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    const user = await fakeUserRepository.createAndSave({
      name: 'John Trê',
      email: 'johntre@exemple.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John TrÊze',
      email: 'johndoe@exemple.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John TrÊ',
      email: 'johntre@exemple.com',
      password: '123123',
      old_password: '123456'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without the old one', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John TrÊ',
      email: 'johntre@exemple.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with the wrong old one', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    await expect(updateUserProfile.execute({
      user_id: user.id,
      name: 'John TrÊ',
      email: 'johntre@exemple.com',
      old_password: 'wrong-old-one',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update non-existing user profile', async () => {
    await expect(updateUserProfile.execute({
      user_id: 'non-existing-user.id',
      name: 'John TrÊ',
      email: 'johntre@exemple.com',
      old_password: 'wrong-old-one',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});