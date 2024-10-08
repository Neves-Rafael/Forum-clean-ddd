import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: "q-1",
      authorId: "a-1",
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: "q-1",
      authorId: "a-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
