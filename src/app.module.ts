import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthMiddleware} from './common/middleware/auth.middleware'
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';

import {join} from 'path'

@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql'], 
      installSubscriptionHandlers: true,
    }), 
    ClassroomModule, 
    MongooseModule.forRoot(process.env.DB_URL), 
    StudentModule ]

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .forRoutes('')
  }
}
