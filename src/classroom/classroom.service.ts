import {Model} from 'mongoose'
import { BadRequestException, ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { updateProperties } from '../../utils/functions';
import { Classroom,ClassroomDocument} from './schemas/classroom.schema';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { CreateClassroomResponseDto } from './dto/create-classroom-response.dto';
import { schoolApi } from '../api/school'
import { AxiosResponse } from 'axios'


@Injectable()
export class ClassroomService {

  constructor(@InjectModel(Classroom.name) private classroomModel: Model<ClassroomDocument>) {}
  
  private readonly logger = new Logger(ClassroomService.name)

  async create(classroomDto: CreateClassroomRequestDto): Promise<CreateClassroomResponseDto> {
    try{

      const response: AxiosResponse<CreateClassroomResponseDto> = await schoolApi.post('/classroom', classroomDto)

      this.logger.log(`classroom created: ${JSON.stringify(response.data)}`)

      return response.data as CreateClassroomResponseDto
    } catch(err){

     throw(new BadRequestException(err));
    }
  }

  async findAll(): Promise<[]> {
    const response:AxiosResponse<[]> = await schoolApi.get('/classroom')
    return response.data
  }

  async findOne({classroomName}: {classroomName:string}) {
    const response = await schoolApi.get(`/classroom/${classroomName}`);
    return response.data
  }

  
  async update(classroomName: string, classroomDto: CreateClassroomRequestDto): Promise<CreateClassroomResponseDto> {
    const response: AxiosResponse<CreateClassroomResponseDto> = await schoolApi.patch(`/classroom/${classroomName}`, classroomDto)
    
    return response.data
  }

  async remove({classroomName}:{classroomName: string}) {
    const response: AxiosResponse<void> = await schoolApi.delete(`/classroom/${classroomName}`)
    return;
  }
}
