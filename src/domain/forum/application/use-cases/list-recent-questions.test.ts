import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { makeQuestion } from "../../../../../test/factories/make-question";
import { ListRecentQuestionsUseCase } from "./list-recent-questions";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: ListRecentQuestionsUseCase;

describe("List Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionRepository);
  });

  it("should be able to list recent questions", async () => {
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }));

    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }));

    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }));

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("should be able to list paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
