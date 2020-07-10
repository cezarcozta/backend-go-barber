"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let showProfile;
describe('ShowProfle', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUserRepository);
  });
  it('should be able to show user profile', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@exemple.com');
  });
  it('should not be able to show non-existing user profile', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user.id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});