import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateClassroomDto {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    @IsNotEmpty()
    name:string
   
    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    @IsNotEmpty()
    size: number
}