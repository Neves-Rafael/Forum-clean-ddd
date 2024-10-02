import type { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import type { UniqueEntityID } from "../../core/entities/unique-entity-id";
import type { Optional } from "../../core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  slug: Slug;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, "createdAt">, id?: UniqueEntityID) {
    const question = new Question({ ...props, createdAt: new Date() }, id);

    return question;
  }
}
