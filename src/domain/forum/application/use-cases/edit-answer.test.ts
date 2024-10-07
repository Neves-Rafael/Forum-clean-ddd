import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: "a-1",
      content: "c-1",
      answerId: newAnswer.id.toValue(),
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "c-1",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    expect(async () => {
      return await sut.execute({
        authorId: "a-2",
        content: "c-1",
        answerId: newAnswer.id.toValue(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
