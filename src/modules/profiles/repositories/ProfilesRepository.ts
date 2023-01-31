import { Profile } from '../entities/Profile';

export type FollowProfile = {
  followerId: string;
  profileId: string;
};

export abstract class ProfilesRepository {
  public abstract findById(id: string): Promise<Profile | null>;
  public abstract followProfile({
    followerId,
    profileId,
  }: FollowProfile): Promise<number>;
  public abstract create(profile: Profile): Promise<void>;
}
