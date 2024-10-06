import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";
import type { AnswerProps } from "../../src/domain/forum/enterprise/entities/answer";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";
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
