import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: "a-1",
      title: "p-1",
      content: "c-1",
      questionId: newQuestion.id.toValue(),
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: "p-1",
      content: "c-1",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "a-2",
      title: "p-1",
      content: "c-1",
      questionId: newQuestion.id.toValue(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
