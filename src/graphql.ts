
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
    __typename?: 'IQuery';
    classrooms?: Nullable<Nullable<Classroom>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';
    createClassroom?: Nullable<Classroom>;
}

export class Classroom {
    __typename?: 'Classroom';
    name?: Nullable<string>;
    size?: Nullable<number>;
}

type Nullable<T> = T | null;
