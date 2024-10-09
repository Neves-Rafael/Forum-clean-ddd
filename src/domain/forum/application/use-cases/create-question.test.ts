import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepository } from "../../../../../test/repositories/in-memory-question-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "New question",
      content: "Question content",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
    expect(inMemoryQuestionRepository.items[0].attachments).toHaveLength(2);
    expect(inMemoryQuestionRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
    ]);
  });
});
