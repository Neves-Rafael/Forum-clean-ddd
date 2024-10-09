import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryQuestionAttachmentRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "../../../../../test/factories/make-question-attachment";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: DeleteQuestionUseCase;

describe("Delete question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    );
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2"),
      })
    );

    await sut.execute({
      questionId: "q-1",
      authorId: "a-1",
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "q-1",
      authorId: "a-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
