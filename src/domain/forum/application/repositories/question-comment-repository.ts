import { Question } from "../../enterprise/entities/question";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
