import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateClassroomInput } from '../../graphql';

export class UpdateClassroomDto implements UpdateClassroomInput {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    name:string
   
    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    size: number    
}
