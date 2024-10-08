import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";

interface ListAnswerCommentUseCaseRequest {
  page: number;
  answerId: string;
}

interface ListAnswerCommentUseCaseResponse {
  answerComment: AnswerComment[];
}

export class ListAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentUseCaseRequest): Promise<ListAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
      page,
    });

    return { answerComment };
  }
}
