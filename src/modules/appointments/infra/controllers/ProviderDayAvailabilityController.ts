import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailabilityProviderService from '../../services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, day, month, year } = request.body;

    const listDayAvailability = container.resolve(
      ListDayAvailabilityProviderService,
    );

    const availability = await listDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
