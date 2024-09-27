import { randomUUID } from "node:crypto";

export class Answer {
  constructor(
    public content: string,
    public authorId: string,
    public questionId: string,
    public id?: string
  ) {
    this.authorId = authorId;
    this.questionId = questionId;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}
