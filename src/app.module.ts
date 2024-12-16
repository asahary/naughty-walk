import { DynamicModule, Module } from "@nestjs/common";
import { CreateOwnerController } from "./Infraestructure/Controller/Owner/CreateOwner/createOwnerController";
import { HealthController } from "./Infraestructure/Controller/Health/healthController";
import { OwnerCreator } from "./Application/createOwner/ownerCreator";
import { OwnerBuilderFromOwnerCreationRequest } from "./Domain/Builder/Owner/ownerBuilderFromOwnerCreationRequest";
import { UuidGenerator } from "./Infraestructure/Service/uuidGenerator";
import { TypeOrmOwnerRepository } from "./Infraestructure/Repository/TypeOrm/typeOrmOwnerRepository";
import { OwnerTypeOrmMapper } from "./Infraestructure/DataModel/TypeOrm/Owner/ownerTypeOrmMapper";
import { PetCreator } from "./Application/createPet/petCreator";
import { AllWalksGetter } from "./Application/getAllWalks/allWalksGetter";
import { WalkPublisher } from "./Application/publishWalk/walkPublisher";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OwnerTypeOrmDataModel } from "./Infraestructure/DataModel/TypeOrm/Owner/ownerTypeOrmDataModel";
import { PetTypeOrmDataModel } from "./Infraestructure/DataModel/TypeOrm/Pet/petTypeOrmDataModel";
import { EnsureEmailIsNotDuplicatedGuard } from "./Domain/IntegrityValidation/ensureEmailIsNotDuplicatedGuard";
import { CreateOwnerResponsePresenter } from "./Infraestructure/Controller/Owner/CreateOwner/createOwnerResponsePresenter";
import {
  CreateOwnerRequestPropertiesValidator
} from "./Infraestructure/Controller/Owner/CreateOwner/createOwnerRequestPropertiesValidator";
import { TypeOrmPetRepository } from "./Infraestructure/Repository/TypeOrm/typeOrmPetRepository";
import { PetBuilderFromOwnerCreationRequest } from "./Domain/Builder/Pet/petBuilderFromCreatePetRequest";
import { PetTypeOrmMapper } from "./Infraestructure/DataModel/TypeOrm/Pet/petTypeOrmMapper";
import { CreatePetController } from "./Infraestructure/Controller/Pet/CreatePet/createPetController";
import {
  CreatePetRequestPropertiesValidator
} from "./Infraestructure/Controller/Pet/CreatePet/createPetRequestPropertiesValidator";
import { CreatePetResponsePresenter } from "./Infraestructure/Controller/Pet/CreatePet/createPetResponsePresenter";
import { EnsureBehaviourValueIsValidGuard } from "./Domain/IntegrityValidation/ensureBehaviourIsValidGuard";
import { RedisWalkRepository } from "./Infraestructure/Repository/Redis/redisWalkRepository";
import {
  GetAllWalkController
} from "./Infraestructure/Controller/Walk/GetAllWalk/getAllWalkController";
import { PostWalkController } from "./Infraestructure/Controller/Walk/CreateWalk/postWalkController";
import { CacheModule, Cache, CacheOptions, CacheStore } from "@nestjs/cache-manager";
import { WalkRedisMapper } from "./Infraestructure/Repository/Redis/walkRedisMapper";
import { redisStore } from "cache-manager-redis-store";
import { WalkBuilderFromOwnerCreationRequest } from "./Domain/Builder/Walk/walkBuilderFromCreateWalkRequest";
import { LocationRedisMapper } from "./Infraestructure/Repository/Redis/locationRedisMapper";
import { GetAllWalkResponsePresenter } from "./Infraestructure/Controller/Walk/GetAllWalk/getAllWalkResponsePresenter";
import { PostWalkResponsePresenter } from "./Infraestructure/Controller/Walk/CreateWalk/postWalkResponsePresenter";

function databaseInitialization(...args: any[]): DynamicModule[] {
  return [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',//type: 'postgres',
        host: 'localhost',//host: configService.get('DATABASE_HOST'),
        port: 5432,//port: +configService.get<number>('DATABASE_PORT'),
        username: 'development',//username: configService.get('DATABASE_USERNAME'),
        password: 'development',//password: configService.get('DATABASE_PASSWORD'),
        database: 'naughty_walk',//database: configService.get('DATABASE_NAME'),
        schema: 'naughty_walk_db',//schema: configService.get('DATABASE_SCHEMA'),
        synchronize: false,//synchronize: false,
        autoLoadEntities: true//autoLoadEntities: true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      OwnerTypeOrmDataModel,
      PetTypeOrmDataModel,
    ])
  ];
}
@Module({
  imports: [
    ...databaseInitialization(),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      },
    }),
  ],
  controllers: [CreateOwnerController, CreatePetController, HealthController, GetAllWalkController, PostWalkController],
  providers: [
    {
      provide: 'IdentifierGenerator',
      useClass: UuidGenerator,
    },
    OwnerCreator,
    OwnerBuilderFromOwnerCreationRequest,
    PetBuilderFromOwnerCreationRequest,
    OwnerTypeOrmMapper,
    PetTypeOrmMapper,
    {
      provide: 'OwnerRepository',
      useClass: TypeOrmOwnerRepository,
    },
    {
      provide: 'PetRepository',
      useClass: TypeOrmPetRepository,
    },
    {
      provide: 'WalkRepository',
      useClass: RedisWalkRepository,
    },
    {
      provide: 'RedisCache',
      useExisting: Cache
    },
    PetCreator,
    AllWalksGetter,
    WalkPublisher,
    EnsureEmailIsNotDuplicatedGuard,
    CreateOwnerResponsePresenter,
    CreateOwnerRequestPropertiesValidator,
    CreatePetRequestPropertiesValidator,
    CreatePetResponsePresenter,
    EnsureBehaviourValueIsValidGuard,
    WalkRedisMapper,
    WalkBuilderFromOwnerCreationRequest,
    LocationRedisMapper,
    PostWalkResponsePresenter,
    GetAllWalkResponsePresenter
  ],
  exports: [
    'RedisCache'
  ]
})
export class AppModule {}
