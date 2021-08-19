
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateClassroomInput {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

export class UpdateClassroomInput {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

export class CreateStudentInput {
    name: string;
    classroomName: string;
}

export class UpdateStudentInput {
    name?: Nullable<string>;
    classroomName?: Nullable<string>;
}

export abstract class IQuery {
    abstract classrooms(): Nullable<Nullable<Classroom>[]> | Promise<Nullable<Nullable<Classroom>[]>>;

    abstract getClassroom(name?: Nullable<string>): Nullable<Classroom> | Promise<Nullable<Classroom>>;

    abstract students(): Nullable<Student>[] | Promise<Nullable<Student>[]>;

    abstract getStudent(id: string): Nullable<Student> | Promise<Nullable<Student>>;
}

export abstract class IMutation {
    abstract createClassroom(createClassroomInput?: Nullable<CreateClassroomInput>): Nullable<Classroom> | Promise<Nullable<Classroom>>;

    abstract deleteClassroom(name: string): Nullable<Void> | Promise<Nullable<Void>>;

    abstract updateClassroom(name: string, updateClassroomInput?: Nullable<UpdateClassroomInput>): Nullable<Classroom> | Promise<Nullable<Classroom>>;

    abstract createStudent(createStudentInput?: Nullable<CreateStudentInput>): Nullable<Student> | Promise<Nullable<Student>>;

    abstract updateStudent(id?: Nullable<string>, updateStudentInput?: Nullable<UpdateStudentInput>): Nullable<Student> | Promise<Nullable<Student>>;

    abstract deleteStudent(id: string): Nullable<Void> | Promise<Nullable<Void>>;
}

export class Classroom {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

export class Student {
    id?: Nullable<string>;
    name?: Nullable<string>;
    classroomName?: Nullable<string>;
}

export type Void = any;
type Nullable<T> = T | null;
