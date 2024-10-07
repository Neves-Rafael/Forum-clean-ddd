import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

interface ListRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    if (!questions) {
      throw new Error("Questions not found.");
    }

    return { questions };
  }
}
