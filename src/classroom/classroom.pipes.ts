import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { CreateClassroomResponseDto } from './dto/create-classroom-response.dto'
import { Classroom } from '../graphql'




/**
 * dtoToSchemaDictionary
 * Creates a mapping between dto and schema nameing
 */
// const dtoToSchemaDictionary: ObjectRenameFieldsMap = [
//   {from: "className", to:"name"},
//   {from: "classSize", to:"size"},
// ];


// @Injectable()
// export class Classroom_DtoToSchemaPipe implements PipeTransform<CreateClassroomRequestDto, Classroom> {
  
//   transform(value: ClassroomDto, metadata: ArgumentMetadata): Classroom {

//     const classroom: Classroom = new Classroom();

//     classroom.name = value.className
//     classroom.size = value.classSize 
    
//     return classroom
//   }
// }

export class Classroom_SchemaToDtoPipe implements PipeTransform<Classroom, CreateClassroomRequestDto>{
  transform(value: Classroom, metadata: ArgumentMetadata): CreateClassroomRequestDto {
    
    const classroomDto: CreateClassroomRequestDto = new CreateClassroomRequestDto()
    classroomDto.className = value.name
    classroomDto.classSize = value.size
    return classroomDto

  }
}




// @Injectable()
// export class createClassroom_DtoToSchemaPipe implements PipeTransform<CreateClassroomResponseDto, Classroom> {
  
//   transform(value: CreateClassroomResponseDto, metadata: ArgumentMetadata): Classroom {

//     const classroom = renameProperties<CreateClassroomRequestDto, Classroom>({from: value, map: dtoToSchemaDictionary})
    
//     return classroom
//   }
// }

// export class createClassroom_SchemaToDtoPipe implements PipeTransform<Classroom, ClassroomDto>{
//   transform(value: Classroom, metadata: ArgumentMetadata): ClassroomDto {
    


//     return classroomDto
//   }
// }



