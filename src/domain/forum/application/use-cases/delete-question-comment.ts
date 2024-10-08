import { QuestionCommentRepository } from "../repositories/question-comment-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({ authorId, questionCommentId }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.questionCommentRepository.delete(questionComment);
  }
}
