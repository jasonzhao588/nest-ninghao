import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3305,
    //   username: 'nest_db',
    //   password: 'q1w2e3',
    //   database: 'nest_db',
    //   synchronize: true,
    //   entities: [__dirname + '/**/*.entity.ts'],
    // }),
    TypeOrmModule.forRoot(),
    PostModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
