import { randomUUID } from "node:crypto";
import type { Slug } from "./value-objects/slug";

export class Question {
  constructor(
    public title: string,
    public content: string,
    public authorId: string,
    public slug: Slug,
    public id?: string
  ) {
    this.title = title;
    this.slug = slug;
    this.authorId = authorId;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}
