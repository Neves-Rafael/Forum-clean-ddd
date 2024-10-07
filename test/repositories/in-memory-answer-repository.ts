import type { AnswerRepository } from "../../src/domain/forum/application/repositories/answer-repository";
import type { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[itemIndex] = answer;
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
