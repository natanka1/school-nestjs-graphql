
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateClassroomInput {
    name: string;
    size: number;
}

export interface UpdateClassroomInput {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

export interface CreateStudentInput {
    name: string;
    classroomName: string;
}

export interface UpdateStudentInput {
    name?: Nullable<string>;
    classroomName?: Nullable<string>;
}

export interface IClassroom {
    name?: Nullable<string>;
    size?: Nullable<number>;
}

export interface IQuery {
    __typename?: 'IQuery';
    classrooms(): Nullable<Nullable<Classroom>[]> | Promise<Nullable<Nullable<Classroom>[]>>;
    getClassroom(name?: Nullable<string>): Nullable<Classroom> | Promise<Nullable<Classroom>>;
    students(): Nullable<Student>[] | Promise<Nullable<Student>[]>;
    getStudent(id: string): Nullable<Student> | Promise<Nullable<Student>>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createClassroom(createClassroomInput?: Nullable<CreateClassroomInput>): Nullable<Classroom> | Promise<Nullable<Classroom>>;
    deleteClassroom(name: string): Nullable<Void> | Promise<Nullable<Void>>;
    updateClassroom(name: string, updateClassroomInput: UpdateClassroomInput): Nullable<Classroom> | Promise<Nullable<Classroom>>;
    createStudent(createStudentInput?: Nullable<CreateStudentInput>): Nullable<Student> | Promise<Nullable<Student>>;
    updateStudent(id?: Nullable<string>, updateStudentInput?: Nullable<UpdateStudentInput>): Nullable<Student> | Promise<Nullable<Student>>;
    deleteStudent(id: string): Nullable<Void> | Promise<Nullable<Void>>;
}

export interface Classroom extends IClassroom {
    __typename?: 'Classroom';
    name: string;
    size: number;
}

export interface Student {
    __typename?: 'Student';
    id?: Nullable<string>;
    name?: Nullable<string>;
    classroomName?: Nullable<string>;
}

export type Void = any;
type Nullable<T> = T | null;
