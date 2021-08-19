import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { Classroom, ClassroomSchema } from 'src/classroom/schemas/classroom.schema';
import { ClassroomService } from './classroom.service';
import { ClassroomResolver } from './classroom.resolver';
@Module({
  imports: [MongooseModule.forFeature([{name: Classroom.name, schema: ClassroomSchema}])],
  providers: [ClassroomService, ClassroomResolver]
})
export class ClassroomModule {}
