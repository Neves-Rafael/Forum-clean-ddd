import type { Answer } from "../entities/answer";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
}
