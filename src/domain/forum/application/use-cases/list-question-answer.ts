import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface ListQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    if (!answers) {
      throw new Error("Answers not found.");
    }

    return { answers };
  }
}
