import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository: AnswerRepository = {
  create: async (answer: Answer): Promise<void> => {
    return;
  },
};

test("Create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    content: "New Response",
    questionId: "1",
    instructorId: "1",
  });

  expect(answer.content).toEqual("New Response");
});
