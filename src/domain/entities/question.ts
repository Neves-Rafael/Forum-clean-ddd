import { randomUUID } from "node:crypto";

export class Question {
  constructor(
    public title: string,
    public content: string,
    public authorId: string,
    public id?: string
  ) {
    this.title = title;
    this.authorId = authorId;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}
