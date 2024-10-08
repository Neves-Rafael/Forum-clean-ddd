import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";
import { AnswerProps } from "../../src/domain/forum/enterprise/entities/answer";
import { faker } from "@faker-js/faker";

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return answer;
}
