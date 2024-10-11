import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryAnswerAttachmentRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachment } from "../../../../../test/factories/make-answer-attachment";

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    sut = new EditAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerAttachmentRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    inMemoryAnswerAttachmentRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("2"),
      })
    );

    await sut.execute({
      authorId: "a-1",
      content: "c-1",
      answerId: newAnswer.id.toValue(),
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "c-1",
    });

    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
    ]);
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("a-1") },
      new UniqueEntityID("q-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "a-2",
      content: "c-1",
      answerId: newAnswer.id.toValue(),
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
