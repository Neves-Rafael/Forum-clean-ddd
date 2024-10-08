import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comment-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { ListQuestionCommentUseCase } from "./list-question-comment";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: ListQuestionCommentUseCase;

describe("List Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
    sut = new ListQuestionCommentUseCase(inMemoryQuestionCommentRepository);
  });

  it("should be able to list question comments", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID("question-1") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.questionComment).toHaveLength(3);
  });

  it("should be able to list paginated question paginated comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID("q-1") })
      );
    }

    const result = await sut.execute({
      questionId: "q-1",
      page: 2,
    });

    expect(result.value?.questionComment).toHaveLength(2);
  });
});
