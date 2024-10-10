import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionAttachmentRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title);
    }
  });
});
