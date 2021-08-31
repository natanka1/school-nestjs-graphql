import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseFilters, UseInterceptors, ConsoleLogger } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schemas/student.schema';
import { CreateStudentDto} from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { createStudent_DtoToSchemaPipe, createStudent_SchemaToDtoPipe,updateStudent_DtoToSchemaPipe , updateStudent_SchemaToDtoPipe } from './student.pipes'
import { cast } from '../../utils/functions'
import { BadRequestExceptionFilter } from '../../utils/exceptions';
import { debug } from 'node:console';


@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Post()
  @UsePipes(new createStudent_DtoToSchemaPipe())
  async create(@Body() createStudentDto: CreateStudentDto) {


    return false
  }

  @Get()
  async findAll() {
    return false
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return null
  }

  @Patch(':id')
  @UsePipes(new updateStudent_DtoToSchemaPipe())
  @UseFilters(new BadRequestExceptionFilter())
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const student = cast<UpdateStudentDto, Student>(updateStudentDto)
    let doc = await this.studentService.update(id, student);
    return doc
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentService.remove(id);
  }
}
