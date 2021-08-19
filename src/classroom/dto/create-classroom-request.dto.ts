import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomRequestDto {
    @ApiProperty({
        description: 'The name of the classroom',
        minimum: 1,
        default: "Math"
    })
    @IsNotEmpty()
    // @Transform(({ value }) => {console.log('transforming value')})
    className: string;

    @ApiProperty({
        description: 'The size of the classroom',
        default: 15
    })
    @IsNotEmpty()
    classSize: number;
}