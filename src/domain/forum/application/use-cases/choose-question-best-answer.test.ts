import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { InMemoryAnswerAttachmentRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";
import { InMemoryQuestionAttachmentRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    );
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionRepository, inMemoryAnswerRepository);
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("a-1"),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "a-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
