import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to create a new Session', async () => {
    const user = await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    const session = await createSession.execute({
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('Should not be able to create a new Session with non authenticated user', async () => {
    await expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new Session with wrong password', async () => {
    await fakeUserRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    await expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: 'wrongpasswd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
