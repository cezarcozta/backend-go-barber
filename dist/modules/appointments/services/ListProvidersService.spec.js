"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersServices = _interopRequireDefault(require("./ListProvidersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersServices.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    const user2 = await fakeUsersRepository.createAndSave({
      name: 'John Tre',
      email: 'johntre@exemple.com',
      password: '123123'
    });
    const loggedUser = await fakeUsersRepository.createAndSave({
      name: 'John Logged',
      email: 'johnlogged@exemple.com',
      password: '123123'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});