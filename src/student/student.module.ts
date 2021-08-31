import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { Student, StudentSchema } from './schemas/student.schema'
import { StudentResolver } from './student.resolver';

@Module({
  providers: [StudentService, StudentResolver]
})
export class StudentModule {}
