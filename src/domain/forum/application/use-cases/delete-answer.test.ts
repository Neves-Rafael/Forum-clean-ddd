import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
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

    expect(async () => {
      return await sut.execute({
        answerId: "q-1",
        authorId: "a-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
