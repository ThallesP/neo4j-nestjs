import { Profile } from '../../../modules/profiles/entities/Profile';
import { ProfileType } from '../types/ProfileType';

export class GraphQLProfileMapper {
  static toType({ id, username }: Profile): ProfileType {
    return {
      id,
      username,
    };
  }
}
