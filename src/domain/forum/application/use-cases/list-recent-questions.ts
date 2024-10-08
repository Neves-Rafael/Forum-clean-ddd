import { Either, left, right } from "../../../../core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[];
  }
>;

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    if (!questions) {
      return left(new ResourceNotFoundError());
    }

    return right({ questions });
  }
}
