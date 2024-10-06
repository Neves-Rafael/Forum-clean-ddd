import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Question } from "../../src/domain/forum/enterprise/entities/question";
import type { QuestionProps } from "../../src/domain/forum/enterprise/entities/question";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create("example-question"),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}
