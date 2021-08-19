import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsePipes } from '@nestjs/common';
import { ClassroomService } from './classroom.service'
import { Classroom_SchemaToDtoPipe } from './classroom.pipes'
import {cast} from '../../utils/functions'
import { Classroom } from '../graphql';
import { CreateClassroomResponseDto } from './dto/create-classroom-response.dto';


@Resolver('Classroom')
export class ClassroomResolver {
    constructor(
        private classroomService: ClassroomService
    ){}
    @Query('classrooms')
    async getClassrooms() : Promise<Classroom[]> {
        const classroomDto: [] = await this.classroomService.findAll()
        const classrooms = classroomDto
            .map((classroom: CreateClassroomResponseDto) => (new Classroom_DtoToSchemaPipe()).transform(classroom, null))

        return classrooms
    }

    @Query('getClassroom')
    async getClassroom(@Args('name') name: string): Promise<Classroom>{
        const classroomDto = await this.classroomService.findOne({classroomName: name})
        const classroom = (new Classroom_DtoToSchemaPipe()).transform(classroomDto, null)
        return classroom;
    }
    
    @Mutation('createClassroom')
    async createClassroom(@Args('createClassroomInput', Classroom_SchemaToDtoPipe) classroom: Classroom) : Promise<Classroom>{
        const classroomDto = cast<Classroom, ClassroomDto>(classroom)

        const createdClasroomDto: ClassroomDto = await this.classroomService.create(classroomDto);

        const createdClassroom:Classroom = (new Classroom_DtoToSchemaPipe()).transform(createdClasroomDto, null)
        return createdClassroom;
    }

    @Mutation('deleteClassroom')
    async deleteClassroom(@Args('name') name: string) : Promise<void>{
        await this.classroomService.remove({classroomName: name})
    }

    @Mutation('updateClassroom')
    async updateClassroom(
        @Args('name') name: string, 
        @Args('updateClassroomInput', Classroom_SchemaToDtoPipe) classroom: Classroom)
        : Promise<Classroom>
    {
        
        const classroomDto = cast<Classroom, ClassroomDto>(classroom)
        const updatedClassroomDto: ClassroomDto = await this.classroomService.update(name, classroomDto)

        const updatedClassroom = (new Classroom_DtoToSchemaPipe()).transform(updatedClassroomDto, null)
        return(updatedClassroom)

    }
}