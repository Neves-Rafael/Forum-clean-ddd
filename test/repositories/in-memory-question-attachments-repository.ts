import { QuestionAttachmentRepository } from "../../src/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "../../src/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() === questionId
    );

    return questionAttachment;
  }
}
