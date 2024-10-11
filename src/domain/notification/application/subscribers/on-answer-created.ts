import { DomainEvents } from "../../../../core/events/domain-events";
import { EventHandler } from "../../../../core/events/event-handler";
import { QuestionRepository } from "../../../forum/application/repositories/question-repository";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../use-case/send-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(answer.questionId.toString());

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `New response in"${question.title.substring(0, 40).concat("...")}"`,
        content: answer.excerpt,
      });
    }
  }
}
