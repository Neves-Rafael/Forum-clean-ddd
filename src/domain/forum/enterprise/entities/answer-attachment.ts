import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Attachment } from "./attachment";

interface AnswerAttachmentProps {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get TopicId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: Attachment, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id);

    return attachment;
  }
}
