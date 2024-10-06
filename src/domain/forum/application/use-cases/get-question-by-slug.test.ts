import { AnswerQuestionUseCase } from "./answer-question";
import type { AnswerRepository } from "../repositories/answers-repository";
import { CreateQuestionUseCase } from "./create-question";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      title: "Example question",
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      content: "example content",
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
