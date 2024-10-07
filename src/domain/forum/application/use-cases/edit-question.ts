import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found!");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return {
      question,
    };
  }
}
