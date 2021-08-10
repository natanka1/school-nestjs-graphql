import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends CreateStudentDto {}

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

