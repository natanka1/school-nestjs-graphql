import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Student, StudentDocument} from './schemas/student.schema'
import { ClassroomDocument, Classroom } from '../classroom/schemas/classroom.schema';
import { updateProperties } from '../../utils/functions';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>,
              @InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>){}

  async create(student: Student) {
    try {
      const classroom = await this.classroomModel.findOne({className: student.classroom}).select('_id')
      let studentModified = {...student, classroom: classroom._id};
      const doc = new this.studentModel(studentModified);
      const savedDoc = await doc.save()

      const savedStudent = await this.studentModel.findById(savedDoc._id).populate("classroom");
      const obj: unknown = savedStudent.classroom;
      const classroomName = obj['className'];
      const response = {
        id: savedStudent._id,
        privateName: savedStudent.privateName,
        classroom: classroomName
      }
      return response
      
    } catch (error) {
      console.log(error)
      throw(new BadRequestException)
    }
  }

  async findAll() {
    let docs = await this.studentModel.find().populate('classroom');
    let students = docs.map(student => {
      const obj: unknown = student.classroom;
      const className = obj['className'];
      const response = {
        id: student._id,
        privateName: student.privateName,
        classroom: className
      }
      return response  
    })

    return students
  }

  async findOne(id: string){
    const student = await this.studentModel.findById(id).populate('classroom');
    const obj: unknown = student.classroom;
    const className = obj['className'];
    const response = {
      id: student._id,
      privateName: student.privateName,
      classroom: className
    }
    return response  

  }

  async update(id: string, student: Student) {
    const studentDoc = await this.studentModel.findById(id)
    const updatedObj = updateProperties<Student>(student, studentDoc)
    const savedStudent = await studentDoc.save();
    const fetchedStudent = await this.findOne(id)
    return fetchedStudent
  }

  async remove(id: string) {
    return this.studentModel.deleteOne({_id:id}).exec()
  }
}
