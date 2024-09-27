import { randomUUID } from "node:crypto";

export class Student {
  constructor(
    public name: string,
    public id?: string
  ) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
