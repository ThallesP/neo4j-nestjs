import { Injectable } from '@nestjs/common';
import { Profile } from '../../entities/Profile';
import { ProfilesRepository } from '../../repositories/ProfilesRepository';

export type CreateProfileData = {
  username: string;
};

@Injectable()
export class CreateProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ username }: CreateProfileData) {
    const profile = new Profile({ username });
    await this.profilesRepository.create(profile);
    return profile;
  }
}
