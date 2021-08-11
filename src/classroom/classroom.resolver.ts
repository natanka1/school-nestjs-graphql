import { Resolver } from '@nestjs/graphql'
import { classroomService }
@Resolver('Classroom')
export class ClassroomResolver {
    constructor(
        private classroomService
    )
}