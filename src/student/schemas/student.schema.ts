import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose'


export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop()
    privateName: string;

    @Prop({String, ref: 'Classroom'})
    classroom: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student)