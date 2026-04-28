import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('database.type', 'sqlite');

        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database: configService.get<string>('database.name', 'db.sqlite'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
          };
        }

        return {
          type: 'mysql',
          host: configService.get<string>('database.host', 'localhost'),
          port: configService.get<number>('database.port', 3306),
          username: configService.get<string>('database.username', 'root'),
          password: configService.get<string>('database.password', ''),
          database: configService.get<string>('database.name', 'nestjs_crud'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<string>('nodeEnv') !== 'production',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
