import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { InMemoryQuestionCommentRepository } from "../../../../../test/repositories/in-memory-question-comment-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "c-1",
    });

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual("c-1");
  });
});
