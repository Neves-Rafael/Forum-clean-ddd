import type { Question } from "../../enterprise/entities/question";
import type { AnswerRepository } from "../repositories/answer-repository";
import type { QuestionRepository } from "../repositories/question-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionRepository.findById(answer.questionId.toString());

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Now Allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return {
      question,
    };
  }
}
