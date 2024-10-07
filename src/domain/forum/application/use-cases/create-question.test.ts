import { AnswerQuestionUseCase } from "./answer-question";
import type { AnswerRepository } from "../repositories/answer-repository";
import { CreateQuestionUseCase } from "./create-question";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "New question",
      content: "Question content",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id);
  });
});
