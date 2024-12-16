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
import { Cache, CacheModule, CacheStore } from "@nestjs/cache-manager";
import { WalkRedisMapper } from "./Infraestructure/Repository/Redis/walkRedisMapper";
import { WalkBuilderFromOwnerCreationRequest } from "./Domain/Builder/Walk/walkBuilderFromCreateWalkRequest";
import { LocationRedisMapper } from "./Infraestructure/Repository/Redis/locationRedisMapper";
import { GetAllWalkResponsePresenter } from "./Infraestructure/Controller/Walk/GetAllWalk/getAllWalkResponsePresenter";
import { PostWalkResponsePresenter } from "./Infraestructure/Controller/Walk/CreateWalk/postWalkResponsePresenter";
import { redisStore } from "cache-manager-redis-store";


function databaseInitialization(...args: any[]){
  return [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: process.env.TYPEORM_DRIVER as unknown as any,
        host:  process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT as unknown as number,
        username:  process.env.TYPEORM_USERNAME,
        password:  process.env.TYPEORM_PASSWORD,
        database:  process.env.TYPEORM_NAME,
        schema:  process.env.TYPEORM_SCHEMA,
        synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
        autoLoadEntities: !!process.env.TYPEORM_AUTOLOAD
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      OwnerTypeOrmDataModel,
      PetTypeOrmDataModel,
    ])
  ];
}
function initializeRedis() {
  return CacheModule.registerAsync({
    useFactory: async () => {
      const store = await redisStore({
        socket: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        },
      });

      return {
        store: store as unknown as CacheStore,
        ttl: +process.env.REDIS_TTL,
      };
    },
  });
}

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: 'development.env',
        isGlobal: true}
    ),
    ...databaseInitialization(),
    initializeRedis(),
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
  exports: []
})
export class AppModule {}
