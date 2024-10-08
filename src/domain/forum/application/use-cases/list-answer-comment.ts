import { Either, right } from "../../../../core/either";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";

interface ListAnswerCommentUseCaseRequest {
  page: number;
  answerId: string;
}

type ListAnswerCommentUseCaseResponse = Either<
  null,
  {
    answerComment: AnswerComment[];
  }
>;

export class ListAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentUseCaseRequest): Promise<ListAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
      page,
    });

    return right({ answerComment });
  }
}
