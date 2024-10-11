import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryQuestionAttachmentRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "../../../../../test/factories/make-question-attachment";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    );
    sut = new EditQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionAttachmentRepository);
  });

  it("should be able to edit a question", async () => {
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
      authorId: "a-1",
      title: "p-1",
      content: "c-1",
      questionId: newQuestion.id.toValue(),
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: "p-1",
      content: "c-1",
    });
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
    ]);
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
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
