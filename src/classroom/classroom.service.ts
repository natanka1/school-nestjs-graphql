import {Model} from 'mongoose'
import { BadRequestException, ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { updateProperties } from '../../utils/functions';
import { CreateClassroomRequestDto } from './dto/create-classroom-request.dto';
import { ClassroomResponseDto } from './dto/classroom-response.dto';
import { schoolApi } from '../api/school'
import { AxiosResponse } from 'axios'


@Injectable()
export class ClassroomService {

  constructor() {}
  
  private readonly logger = new Logger(ClassroomService.name)

  async create(classroomDto: CreateClassroomRequestDto): Promise<CreateClassroomRequestDto> {
    try{

      const response: AxiosResponse<CreateClassroomRequestDto> = await schoolApi.post('/classroom', classroomDto)

      this.logger.log(`classroom created: ${JSON.stringify(response.data)}`)

      return response.data as CreateClassroomRequestDto
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

  
  async update(classroomName: string, createClassroomRequestDto: CreateClassroomRequestDto): Promise<CreateClassroomRequestDto> {
    const response: AxiosResponse<CreateClassroomRequestDto> = await schoolApi.patch(`/classroom/${classroomName}`, createClassroomRequestDto)
    
    return response.data
  }

  async remove({classroomName}:{classroomName: string}) {
    const response: AxiosResponse<void> = await schoolApi.delete(`/classroom/${classroomName}`)
    return;
  }
}
