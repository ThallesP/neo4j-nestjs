import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

export type TweetProps = {
  content: string;
  profileId: string;
  likes?: number;

  createdAt?: Date;
};

@Injectable()
export class Tweet {
  constructor(private props: TweetProps, private _id?: string) {
    this._id = _id ?? uuidV4();
    this.props.likes = this.props.likes ?? 0;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this.props.content;
  }

  get profileId(): string {
    return this.props.profileId;
  }

  get likes(): number {
    return this.props.likes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
