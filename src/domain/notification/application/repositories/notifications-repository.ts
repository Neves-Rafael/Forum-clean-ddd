import { Notification } from "../../enterprise/entities/notification";

export interface NotificationRepository {
  create(notification: Notification): Promise<void>;
}
