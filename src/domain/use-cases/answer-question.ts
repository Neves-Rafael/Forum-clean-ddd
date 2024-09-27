import { Answer } from "../entities/answer";
import type { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content, instructorId, questionId);

    await this.answersRepository.create(answer);

    return answer;
  }
}
