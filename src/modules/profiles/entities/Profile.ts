import { v4 as uuidV4 } from 'uuid';
export type ProfileProps = {
  username: string;
};

export class Profile {
  constructor(private props: ProfileProps, private _id?: string) {
    this._id = _id ?? uuidV4();
  }

  get id(): string {
    return this._id;
  }

  get username() {
    return this.props.username;
  }
}
