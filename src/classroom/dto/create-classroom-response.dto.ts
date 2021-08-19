import { Expose } from 'class-transformer';

export class CreateClassroomResponseDto {
    @Expose({name:"name"})
    className: string;

    @Expose({name:"size"})
    classSize: number;
}

