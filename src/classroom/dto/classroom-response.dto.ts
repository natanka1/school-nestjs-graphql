import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ClassroomDto } from './classroom.dto'
export class ClassroomResponseDto implements ClassroomDto {

    @ApiProperty({
      description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    className: string;

    @ApiProperty({
      description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    classSize: number;

    constructor(className:string, classSize: number){
      
      this.className = className;
      this.classSize = classSize;
    }

}

