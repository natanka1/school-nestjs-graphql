import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {
  @Prop({
    unique: true
  })
  className!: string;
  @Prop()
  classSize!: number;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

/**
 * CustomerSchema.virtual('fullName')
.set(function (fullName: string) {
  const [firstName, lastName] = fullName.split(' ');
  this.set({ firstName, lastName });
})
.get(function() {
  return `${this.firstName} ${this.lastName}`;
});
 * 
 */