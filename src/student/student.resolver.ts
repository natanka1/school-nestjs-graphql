import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsePipes } from '@nestjs/common';
import { StudentService } from './student.service'
import { createStudent_DtoToSchemaPipe, createStudent_SchemaToDtoPipe,updateStudent_DtoToSchemaPipe, updateStudent_SchemaToDtoPipe } from './student.pipes'
import {cast} from '../../utils/functions'
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schemas/student.schema';
import { UpdateStudentDto } from './dto/update-student.dto';

@Resolver('Student')
export class StudentResolver {
    constructor(
        private studentService: StudentService
    ){}
    @Query('students')
    async getStudents(){
        const docs = await this.studentService.findAll()
        const studentsDto = docs
            .map(student => (new createStudent_SchemaToDtoPipe()).transform(student, null))

        return studentsDto
    }

    @Query('getStudent')
    async getStudent(@Args('id') id: string){

        const doc = await this.studentService.findOne(id)
        const studentDto = (new createStudent_SchemaToDtoPipe()).transform(doc, null)
        return studentDto
    }
    

    @Mutation('createStudent')
    @UsePipes(new createStudent_DtoToSchemaPipe()) /** Transforming the DTO to Schema shape */
    async createStudent(@Args('createStudentInput') args: CreateStudentDto) : Promise<CreateStudentDto>{
        const student = cast<CreateStudentDto, Student>(args)
        
        const studentDoc = await this.studentService.create(student);

        const studentDto = (new createStudent_SchemaToDtoPipe()).transform(studentDoc, null)
        return studentDto
    }

    @Mutation('deleteStudent')
    async deleteStudent(@Args('id') id: string) : Promise<void>{
        await this.studentService.remove(id)
    }

    @Mutation('updateStudent')
    async updateStudent(
        @Args('id') id: string, 
        @Args('updateStudentInput', updateStudent_DtoToSchemaPipe) updateStudentDto: UpdateStudentDto)
        : Promise<UpdateStudentDto>
    {
        try{
        const student = cast<UpdateStudentDto, Student>(updateStudentDto) 

        let doc = await this.studentService.update(id, student)

        const studentDto = (new updateStudent_SchemaToDtoPipe()).transform(doc, null)

        return(studentDto)
        } catch(err){
            console.log(`error occured: ${err}`)
        }

    }
}