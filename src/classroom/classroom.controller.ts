import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseFilters,  } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from './schemas/classroom.schema';
import { CreateClassroomDto } from './dto/create-classroom.dto'
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { createClassroom_DtoToSchemaPipe, createClassroom_SchemaToDtoPipe,updateClassroom_DtoToSchemaPipe, updateClassroom_SchemaToDtoPipe } from './classroom.pipes'
import { UsePipes } from '@nestjs/common';
import { BadRequestExceptionFilter } from 'utils/exceptions';
import {cast} from '../../utils/functions'

@Controller('class')
export class ClassroomController {
  constructor(private readonly classService: ClassroomService) {}

  @Post()
  @UsePipes(new createClassroom_DtoToSchemaPipe()) /** Transforming the DTO to Schema shape */
  @UseFilters(new BadRequestExceptionFilter())
  async create(@Body() createClassroomDto: CreateClassroomDto /**!!! Using a temporary type for Swagger compatibility (DTO) */) {
      // Casting from dto type to schema 
      const classroom = cast<CreateClassroomDto, Classroom>(createClassroomDto)
      // const obj: unknown = createClassroomDto;
      // const classroom: Classroom = obj as Classroom;
      const classroomDoc = await this.classService.create(classroom);
      const classroomDto = (new createClassroom_SchemaToDtoPipe()).transform(classroomDoc, null)
      return classroomDto
  }

  @Get()
  async findAll() {
    const docs = await this.classService.findAll();
    const classroomDtos = docs
      .map(classroom => (new createClassroom_SchemaToDtoPipe()).transform(classroom.toObject(), null))
    return classroomDtos;
  }

  @Get(':classroomName')
  async findOne(@Param('classroomName') classroomName: string) {
    const doc = await this.classService.findOne({classroomName})
    
    const classroomDto = (new createClassroom_SchemaToDtoPipe()).transform(doc.toObject(), null)
    return classroomDto;
  }

  @Patch(':classroomName')
  @UsePipes(new updateClassroom_DtoToSchemaPipe())
  @UseFilters(new BadRequestExceptionFilter())
  async update(@Param('classroomName') classroomName: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    const classroom = cast<UpdateClassroomDto, Classroom>(updateClassroomDto)
    let doc = await this.classService.update(classroomName, classroom)
    const leanDoc = doc.toObject()
    delete(leanDoc._id)
    delete(leanDoc.__v)
    const classroomDto = (new updateClassroom_SchemaToDtoPipe()).transform(leanDoc, null)
    return(classroomDto)

  }

  @Delete(':classroomName')
  async remove(@Param('classroomName') classroomName: string) {
    return await this.classService.remove({classroomName});
  }
}
