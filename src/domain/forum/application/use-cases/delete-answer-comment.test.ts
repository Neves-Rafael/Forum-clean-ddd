import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comment-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "../../../../../test/factories/make-answer-comment";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer comment", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("a-1"),
    });

    await inMemoryAnswerCommentRepository.create(answerComment);

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: "a-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
