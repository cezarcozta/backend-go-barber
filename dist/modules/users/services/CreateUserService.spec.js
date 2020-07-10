"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUserRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    expect(user).toHaveProperty('id');
  });
  it('Should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    await expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});