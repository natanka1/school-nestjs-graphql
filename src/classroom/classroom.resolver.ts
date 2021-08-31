import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql'
import { ClassroomService } from './classroom.service'
import { Classroom_SchemaToDtoPipe, Classroom_DtoToSchemaPipe } from './classroom.pipes'
import {cast} from '../../utils/functions'
import { ClassroomSchema as Classroom, ClassroomSchema} from './schemas/classroom.schema';
import { ClassroomResponseDto } from './dto/classroom-response.dto';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { ClassroomDto } from './dto/classroom.dto'

import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

@Resolver('Classroom')
export class ClassroomResolver {
    constructor(
        private classroomService: ClassroomService
    ){}
    @ResolveField()
    __resolveType(value) {
      return "Classroom"
    }


    @Query('classrooms')
    async getClassrooms() : Promise<Classroom[]> {
        const classroomDtos: ClassroomDto[] = await this.classroomService.findAll()

        return ([] as Classroom[])
    }

    @Query('getClassroom')
    async getClassroom(@Args('name') name: string): Promise<Classroom>{
        const classroomDto: ClassroomDto = await this.classroomService.findOne({classroomName: name})
        const newclassroom = new Classroom(classroomDto);
        return newclassroom;
    }
    
    @Mutation('createClassroom')
    
    async createClassroom(@Args('createClassroomInput',Classroom_SchemaToDtoPipe) classroom: Classroom): Promise<Classroom>{
        const classroomRequestDto = cast<Classroom, CreateClassroomRequestDto>(classroom)
        const createdClassroom: ClassroomDto = await this.classroomService.create(classroomRequestDto);
        const newclassroom = new Classroom(createdClassroom);
        return newclassroom
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
        
        const classroomRequestDto = cast<Classroom, CreateClassroomRequestDto>(classroom)
        const updatedClassroomDto: ClassroomDto = await this.classroomService.update(name, classroomRequestDto)

        const updatedClassroom = new Classroom(updatedClassroomDto)
        return updatedClassroom

    }
}