import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
