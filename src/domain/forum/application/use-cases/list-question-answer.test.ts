import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { ListQuestionAnswersUseCase } from "./list-question-answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new ListQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it("should be able to list question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it("should be able to list paginated question paginated answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityID("q-1") }));
    }

    const { answers } = await sut.execute({
      questionId: "q-1",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
