import { AnswerQuestionUseCase } from "./answer-question";
import type { AnswerRepository } from "../repositories/answers-repository";
import { CreateQuestionUseCase } from "./create-question";
import type { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question): Promise<void> => {
    return;
  },
};

test("Create an question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "New question",
    content: "Question content",
  });

  expect(question.id).toBeTruthy();
});
