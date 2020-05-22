import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('CreateSession', () => {
  it('Should be able to create a new Session', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
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
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new Session with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    expect(
      createSession.execute({
        email: 'johndoe@exemple.com',
        password: 'wrongpasswd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
