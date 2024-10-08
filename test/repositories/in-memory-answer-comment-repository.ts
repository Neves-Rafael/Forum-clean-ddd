import { AnswerCommentRepository } from "../../src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }
}
