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
        return []
    }

    @Query('getStudent')
    async getStudent(@Args('id') id: string){

        return null
    }
    

    @Mutation('createStudent')
    @UsePipes(new createStudent_DtoToSchemaPipe()) /** Transforming the DTO to Schema shape */
    async createStudent(@Args('createStudentInput') args: CreateStudentDto) : Promise<CreateStudentDto>{
        return null
    }

    @Mutation('deleteStudent')
    async deleteStudent(@Args('id') id: string) : Promise<void>{
        await this.studentService.remove(id)
    }

    @Mutation('updateStudent')
    async updateStudent(
        @Args('id') id: string, 
        @Args('updateStudentInput', updateStudent_DtoToSchemaPipe) updateStudentDto: UpdateStudentDto)
    {
        try{
            null
        } catch(err){
            console.log(`error occured: ${err}`)
        }

    }
}