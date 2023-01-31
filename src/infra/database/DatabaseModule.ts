import { Neo4JProfilesRepository } from './neo4j/repositories/Neo4JProfilesRepository';
import { Module } from '@nestjs/common';
import { ProfilesRepository } from '../../modules/profiles/repositories/ProfilesRepository';
import { TweetsRepository } from '../../modules/tweets/repositories/TweetsRepository';
import { Neo4JTweetsRepository } from './neo4j/repositories/Neo4JTweetsRepository';
import { Transformer } from './neo4j/Transformer';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: TweetsRepository,
      useClass: Neo4JTweetsRepository,
    },
    {
      provide: ProfilesRepository,
      useClass: Neo4JProfilesRepository,
    },
    Transformer,
  ],
  exports: [TweetsRepository, ProfilesRepository],
})
export class DatabaseModule {}
