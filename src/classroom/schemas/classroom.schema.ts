import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Classroom } from '../../graphql'
import { ClassroomDto } from '../dto/classroom.dto'


@Schema()
export class ClassroomSchema implements Classroom {

  name: string;

  size: number;

  constructor(classroomDto: ClassroomDto){
    this.name = classroomDto.className;
    this.size = classroomDto.classSize;
  }
}

