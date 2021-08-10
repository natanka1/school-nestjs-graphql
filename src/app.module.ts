import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware} from './common/middleware/auth.middleware'
import { ClassroomModule } from './classroom/classroom.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ConfigModule.forRoot(), ClassroomModule, MongooseModule.forRoot(process.env.DB_URL), StudentModule ]

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .forRoutes('')
  }
}
