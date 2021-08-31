import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Student, StudentDocument} from './schemas/student.schema'

import { updateProperties } from '../../utils/functions';

@Injectable()
export class StudentService {
  constructor(){}

  async create(student: Student) {
    try {

      
      
    } catch (error) {
      console.log(error)
      throw(new BadRequestException)
    }
  }

  async findAll() {
    


  }

  async findOne(id: string){

  }

  async update(id: string, student: Student) {

  }

  async remove(id: string) {

  }
}
