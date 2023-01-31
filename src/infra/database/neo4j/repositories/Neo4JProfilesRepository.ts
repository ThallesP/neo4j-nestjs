import { Injectable } from '@nestjs/common';
import { Profile } from '../../../../modules/profiles/entities/Profile';
import {
  FollowProfile,
  ProfilesRepository,
} from '../../../../modules/profiles/repositories/ProfilesRepository';
import { client } from '../client';
import { Transformer } from '../Transformer';

@Injectable()
export class Neo4JProfilesRepository implements ProfilesRepository {
  constructor(private transformer: Transformer) {}

  public async create(profile: Profile): Promise<void> {
    const session = client.session();

    await session.run(
      `
      CREATE (p:Profile{ id: $profileId, username: $username })
    `,
      { profileId: profile.id, username: profile.username },
    );
  }

  public async followProfile({
    followerId,
    profileId,
  }: FollowProfile): Promise<number> {
    const session = client.session();

    const { records } = await session.run(
      `
      MATCH (p:Profile{ id: $profileId })
      MATCH (f:Profile{ id: $followerId })
      MERGE (f)-[:FOLLOWED]->(p)
      WITH p
      MATCH ()-[follows:FOLLOWED]->(p)
      RETURN COUNT(follows) AS followCount
      `,
      {
        followerId,
        profileId,
      },
    );

    const { followCount } = this.transformer.transformRecord(records[0]);
    await session.close();

    return followCount;
  }

  public async findById(profileId: string): Promise<Profile> {
    const session = client.session();
    const { records } = await session.run(
      `MATCH (p:Profile{ id: $profileId }) RETURN profile`,
      {
        profileId,
      },
    );

    if (!records[0]) return null;

    const profile = this.transformer.transformRecord(records[0]);
    await session.close();

    return new Profile({ username: profile.username });
  }
}
