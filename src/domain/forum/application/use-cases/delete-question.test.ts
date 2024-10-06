import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe("Delete question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      questionId: "q-1",
      authorId: "a-1",
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    expect(async () => {
      return await sut.execute({
        questionId: "q-1",
        authorId: "a-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
