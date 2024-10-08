import { Either, left, right } from "../../../../core/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";
import { AnswerRepository } from "../repositories/answer-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);

    return right({ answerComment });
  }
}
