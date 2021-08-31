import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { ClassroomResponseDto } from './dto/classroom-response.dto'
import { ClassroomSchema as Classroom} from './schemas/classroom.schema'


@Injectable()
export class Classroom_SchemaToDtoPipe implements PipeTransform<Classroom, CreateClassroomRequestDto>{
  transform(value: Classroom, metadata: ArgumentMetadata): CreateClassroomRequestDto {
    
    const classroomDto: CreateClassroomRequestDto = new CreateClassroomRequestDto()
    classroomDto.className = value.name
    classroomDto.classSize = value.size
    return classroomDto

  }
}

export class Classroom_DtoToSchemaPipe implements PipeTransform<CreateClassroomRequestDto, Classroom> {
  
  transform(value: CreateClassroomRequestDto, metadata: ArgumentMetadata): Classroom {

    const classroom: Classroom = new Classroom(value);

    return classroom
  }
}

// export class createClassroom_SchemaToDtoPipe implements PipeTransform<Classroom, ClassroomDto>{
//   transform(value: Classroom, metadata: ArgumentMetadata): ClassroomDto {
    


//     return classroomDto
//   }
// }



