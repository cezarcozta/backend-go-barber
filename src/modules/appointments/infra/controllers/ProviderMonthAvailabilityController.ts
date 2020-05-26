import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvailabilityProviderService from '../../services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const listMonthAvailability = container.resolve(
      ListMonthAvailabilityProviderService,
    );

    const availability = await listMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
