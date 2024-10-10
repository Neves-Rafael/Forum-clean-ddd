import { PaginationParams } from "../../src/core/repositories/pagination-params";
import { AnswerAttachmentRepository } from "../../src/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerRepository } from "../../src/domain/forum/application/repositories/answer-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  constructor(private answerAttachmentsRepository: AnswerAttachmentRepository) {}

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[itemIndex] = answer;
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
