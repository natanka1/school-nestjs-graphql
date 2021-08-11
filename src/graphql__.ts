
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateClassroomInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export abstract class IQuery {
    abstract classrooms(): Nullable<Nullable<Classroom>[]> | Promise<Nullable<Nullable<Classroom>[]>>;
}

export abstract class IMutation {
    abstract createClassroom(createClassroomInput?: Nullable<CreateClassroomInput>): Nullable<Classroom> | Promise<Nullable<Classroom>>;
}

export class Classroom {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

type Nullable<T> = T | null;
