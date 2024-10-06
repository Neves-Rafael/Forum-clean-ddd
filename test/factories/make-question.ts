import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Question } from "../../src/domain/forum/enterprise/entities/question";
import type { QuestionProps } from "../../src/domain/forum/enterprise/entities/question";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: "Example question",
    slug: Slug.create("example-question"),
    authorId: new UniqueEntityID(),
    content: "example content",
    ...override,
  });

  return question;
}
