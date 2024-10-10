import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "New notification",
      content: "Notification content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification);
  });
});
