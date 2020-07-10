"use strict";

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeAppointmentRepository;
let listProviderDayAvailability;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(fakeAppointmentRepository);
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.createAndSave({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentRepository.createAndSave({
      user_id: '123123',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 13,
      available: true
    }, {
      hour: 14,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});