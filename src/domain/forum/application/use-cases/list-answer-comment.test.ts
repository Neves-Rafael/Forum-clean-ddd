import { makeAnswerComment } from "../../../../../test/factories/make-answer-comment";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comment-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { ListAnswerCommentUseCase } from "./list-answer-comment";

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: ListAnswerCommentUseCase;

describe("List Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new ListAnswerCommentUseCase(inMemoryAnswerCommentRepository);
  });

  it("should be able to list answer comments", async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID("answer-1") })
    );

    const { answerComment } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(answerComment).toHaveLength(3);
  });

  it("should be able to list paginated answer paginated comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID("q-1") })
      );
    }

    const { answerComment } = await sut.execute({
      answerId: "q-1",
      page: 2,
    });

    expect(answerComment).toHaveLength(2);
  });
});
