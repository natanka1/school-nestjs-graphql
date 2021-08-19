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

      const classroom = await this.classroomModel.findOne({className: student.classroom}).select('className')

      let studentModified = {...student, classroom: classroom.toObject().className};

      const doc = new this.studentModel(studentModified);

      const savedDoc = await doc.save()

      const savedStudent = await this.studentModel.findById(savedDoc._id)
      
      const response = {
        id: savedStudent._id,
        privateName: savedStudent.privateName,
        classroom: savedStudent.classroom,
      }
      return response
      
    } catch (error) {
      console.log(error)
      throw(new BadRequestException)
    }
  }

  async findAll() {
    
    let docs = await this.studentModel.find()
    const students = docs.map(doc => {
      const student = doc.toObject()
      student.id = student._id;
      delete(student.__v)
      delete(student._id)
      return student
    })
    return students
  }

  async findOne(id: string){
    const doc = await this.studentModel.findById(id)
    const student = doc.toObject();
    student.id = student._id
    delete(student.__v)
    delete(student._id)
    return student
  }

  async update(id: string, student: Student) {
    const studentDoc = await this.studentModel.findById(id)

    const updatedObj = updateProperties<Student>(student, studentDoc)

    const savedStudent = await studentDoc.save();

    const fetchedStudent = await this.studentModel.findById(id)

    return fetchedStudent.toObject()
  }

  async remove(id: string) {
    return this.studentModel.deleteOne({_id:id}).exec()
  }
}
