import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStudentInput } from '../../graphql';

export class CreateStudentDto implements CreateStudentInput {
    @ApiProperty({
        description: 'the name of the student'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'the name of the classroom to add the student'
    })
    @IsNotEmpty()
    classroomName: string;
}
