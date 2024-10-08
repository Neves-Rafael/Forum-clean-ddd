import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
  findById(id: string): Promise<QuestionComment | null>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
