import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { Student, StudentSchema } from './schemas/student.schema'
import { Classroom, ClassroomSchema } from '../classroom/schemas/classroom.schema';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
            MongooseModule.forFeature([{name: Classroom.name, schema: ClassroomSchema}])],
  providers: [StudentService, StudentResolver]
})
export class StudentModule {}
