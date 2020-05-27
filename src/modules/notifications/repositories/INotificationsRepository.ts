import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notifications from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  createAndSave(data: ICreateNotificationDTO): Promise<Notifications>;
}
