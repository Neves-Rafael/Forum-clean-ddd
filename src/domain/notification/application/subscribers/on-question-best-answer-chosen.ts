import { DomainEvents } from "../../../../core/events/domain-events";
import { EventHandler } from "../../../../core/events/event-handler";
import { AnswerRepository } from "../../../forum/application/repositories/answer-repository";
import { QuestionBestAnswerChosenEvent } from "../../../forum/enterprise/events/question-best-answer-chosen-event";
import { SendNotificationUseCase } from "../use-case/send-notification";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString());

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: "Your answer are chosen!",
        content: `The answer that you submitted in${question.title.substring(0, 20).concat("...")} was chosen by the author`,
      });
    }
  }
}
