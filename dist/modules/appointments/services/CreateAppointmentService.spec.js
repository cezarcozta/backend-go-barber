"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let fakeNotificationsRepository;
let createAppointment;
let cacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    cacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeNotificationsRepository, cacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(20202, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      user_id: '321321',
      date: new Date(20202, 4, 10, 13),
      provider_id: '123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const apointmentDate = new Date(2020, 5, 10, 14);
    await createAppointment.execute({
      user_id: '321321',
      date: apointmentDate,
      provider_id: '123123'
    });
    await expect(createAppointment.execute({
      user_id: '321321',
      date: apointmentDate,
      provider_id: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(20202, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123123',
      provider_id: '321321'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(20202, 4, 10, 13).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123123',
      provider_id: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 5, 11, 7),
      user_id: 'userid',
      provider_id: 'providerid'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 5, 11, 18),
      user_id: 'userid',
      provider_id: 'providerid'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});