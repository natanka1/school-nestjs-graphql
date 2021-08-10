import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './schemas/classroom.schema'
import { renameProperties } from '../../utils/functions'
import { ObjectRenameFieldsMap } from '../../utils/functions';


/**
 * dtoToSchemaDictionary
 * Creates a mapping between dto and schema nameing
 */
const dtoToSchemaDictionary: ObjectRenameFieldsMap = [
  {from: "name", to:"className"},
  {from: "size", to:"classSize"},
];

@Injectable()
export class createClassroom_DtoToSchemaPipe implements PipeTransform<CreateClassroomDto, Classroom> {
  transform(value: CreateClassroomDto, metadata: ArgumentMetadata): Classroom {
    
    const classroom = renameProperties<CreateClassroomDto, Classroom>({from: value, map: dtoToSchemaDictionary})
    
    return classroom
  }
}

export class createClassroom_SchemaToDtoPipe implements PipeTransform<Classroom, CreateClassroomDto>{
  transform(value: Classroom, metadata: ArgumentMetadata): CreateClassroomDto {
    let classroomDto = renameProperties<Classroom, CreateClassroomDto>({from: value, map: dtoToSchemaDictionary, isReversedMap:true})
    return classroomDto
  }
}




@Injectable()
export class updateClassroom_DtoToSchemaPipe extends createClassroom_DtoToSchemaPipe {
  transform(value: UpdateClassroomDto, metadata: ArgumentMetadata): any {
    
    return super.transform(value, metadata)
  }
}

export class updateClassroom_SchemaToDtoPipe implements PipeTransform<Classroom, UpdateClassroomDto>{
  transform(value: Classroom, metadata: ArgumentMetadata): UpdateClassroomDto {
    const classroomDto = renameProperties<Classroom, UpdateClassroomDto>({from: value, map: dtoToSchemaDictionary, isReversedMap:true})
    return classroomDto
  }
}