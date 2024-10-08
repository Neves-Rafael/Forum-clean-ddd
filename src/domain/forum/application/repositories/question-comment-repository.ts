import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
