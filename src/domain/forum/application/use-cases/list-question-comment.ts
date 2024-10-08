import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentRepository } from "../repositories/question-comment-repository";

interface ListQuestionCommentUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionCommentUseCaseResponse {
  questionComment: QuestionComment[];
}

export class ListQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentUseCaseRequest): Promise<ListQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findManyByQuestionId(questionId, {
      page,
    });

    return { questionComment };
  }
}
