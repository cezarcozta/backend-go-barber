import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import INotificationRepository from '../../../repositories/INotificationRepository';

import Notifications from '../schemas/Notifications';

class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notifications>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifications, 'mongo');
  }

  public async createAndSave({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notifications> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
