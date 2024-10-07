import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found!");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return {
      answer,
    };
  }
}
