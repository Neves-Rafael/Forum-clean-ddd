import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { InMemoryAnswerCommentRepository } from "../../../../../test/repositories/in-memory-answer-comment-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();

    sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepository);
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "c-1",
    });

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual("c-1");
  });
});
