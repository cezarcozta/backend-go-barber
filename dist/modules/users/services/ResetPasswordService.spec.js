"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset de password', async () => {
    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '321321',
      token
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('321321');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('321321');
  });
  it('should not be able to reset the password with non-exisiting token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '32131'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-exisiting user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '32131'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password if a token has more than 2 hours', async () => {
    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const futureDate = new Date();
      return futureDate.setHours(futureDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});