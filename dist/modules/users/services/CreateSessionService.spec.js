"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateSessionService = _interopRequireDefault(require("./CreateSessionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let createSession;
describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createSession = new _CreateSessionService.default(fakeUserRepository, fakeHashProvider);
  });
  it('Should be able to create a new Session', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    const session = await createSession.execute({
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });
  it('Should not be able to create a new Session with non authenticated user', async () => {
    await expect(createSession.execute({
      email: 'johndoe@exemple.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should not be able to create a new Session with wrong password', async () => {
    await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    await expect(createSession.execute({
      email: 'johndoe@exemple.com',
      password: 'wrongpasswd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});