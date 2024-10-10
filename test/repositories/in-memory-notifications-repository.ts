import { NotificationRepository } from "../../src/domain/notification/application/repositories/notifications-repository";
import { Notification } from "../../src/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
}
