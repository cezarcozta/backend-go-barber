import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  createAndSave(data: ICreateNotificationDTO): Promise<Notification>;
}
