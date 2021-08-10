import {Model} from 'mongoose'
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom,ClassroomDocument} from 'src/classroom/schemas/classroom.schema';
import { updateProperties } from '../../utils/functions';


@Injectable()
export class ClassroomService {
  constructor(@InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>) {}
  
  private readonly logger = new Logger(ClassroomService.name)

  async create(classroom: Classroom): Promise<Classroom> {
    try{
      const doc = new this.classroomModel(classroom)
      const result = await doc.save();
      this.logger.log("classroom created")
      return result;
    } catch(err){
     throw(new BadRequestException(err));
    }
  }

  async findAll() {
    const doc = await this.classroomModel.find().select('-_id -__v ').exec();
    return doc
  }

  async findOne({classroomName}: {classroomName:string}) {
    const doc = await this.classroomModel.findOne({className: classroomName}).select('-_id -__v');
    return doc
  }

  
  async update(classroomName: string, classroom: Classroom) {
    const classroomDoc = await this.classroomModel.findOne({className: classroomName})
    if(!classroomDoc){
      throw new Error('document not found')
    }

    const updatedObj = updateProperties<Classroom>(classroom, classroomDoc)

    const doc = await classroomDoc.save()
    
    return(doc)
  }

  remove({classroomName}:{classroomName: string}) {
    return this.classroomModel.deleteOne({className: classroomName}).exec();
  }
}
