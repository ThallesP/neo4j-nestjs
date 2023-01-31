import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from '../../repositories/ProfilesRepository';

export type FollowProfileData = {
  followerId: string;
  profileId: string;
};

@Injectable()
export class FollowProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ followerId, profileId }: FollowProfileData) {
    return await this.profilesRepository.followProfile({
      followerId,
      profileId,
    });
  }
}
