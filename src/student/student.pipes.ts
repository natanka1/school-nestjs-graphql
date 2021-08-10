import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto'
import { Student } from './schemas/student.schema'
import {ObjectRenameFieldsMap, renameProperties} from '../../utils/functions'


const dtoToSchemaDictionary: ObjectRenameFieldsMap = [
  {from: "name", to: "privateName"},
  {from: "classroomName", to: "classroom"}
]

@Injectable()
export class createStudent_DtoToSchemaPipe implements PipeTransform<CreateStudentDto, Student> {
  transform(value: CreateStudentDto, metadata: ArgumentMetadata): Student {
    const student = renameProperties<CreateStudentDto, Student>({from:value, map: dtoToSchemaDictionary})
    return student;
  }
}

export class createStudent_SchemaToDtoPipe implements PipeTransform<Student, CreateStudentDto> {
  transform(value: Student, metadata: ArgumentMetadata): CreateStudentDto {
    const studentDto = renameProperties<Student, CreateStudentDto>({from:value, map: dtoToSchemaDictionary, isReversedMap:true})
    return studentDto;
  }
}


@Injectable()
export class updateStudent_DtoToSchemaPipe extends createStudent_DtoToSchemaPipe {
  transform(value: UpdateStudentDto, metadata: ArgumentMetadata): Student {
    return super.transform(value, metadata)
  }
}

export class updateStudent_SchemaToDtoPipe extends createStudent_SchemaToDtoPipe {
  transform(value: Student, metadata: ArgumentMetadata): UpdateStudentDto {
    return super.transform(value, metadata)
  }
}