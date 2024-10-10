import { Either, right } from "../../../../core/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationRepository } from "../repositories/notifications-repository";

interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title,
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
