import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset de password', async () => {
    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '321321',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('321321');
    expect(updatedUser?.password).toBe('321321');
  });

  it('should not be able to reset the password with non-exisiting token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '32131',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-exisiting user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '32131',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if a token has more than 2 hours', async () => {
    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const futureDate = new Date();

      return futureDate.setHours(futureDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
