import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './schemas/student.schema'
import { Classroom, ClassroomSchema } from '../classroom/schemas/classroom.schema';
@Module({
  imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]),
            MongooseModule.forFeature([{name: Classroom.name, schema: ClassroomSchema}])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
