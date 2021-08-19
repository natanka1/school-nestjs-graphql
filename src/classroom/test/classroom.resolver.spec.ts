import { Test } from "@nestjs/testing"
import { ClassroomResolver } from "../classroom.resolver"
import { ClassroomService } from "../classroom.service"
import { ClassroomDto } from "../dto/classroom.dto"

jest.mock('../classroom.service')

describe ('ClassroomResolver',()=>{
    let classroomResolver: ClassroomResolver;
    let classroomService: ClassroomService;
    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            imports:[],
            providers: [ClassroomService, ClassroomResolver],
        }).compile()
        classroomResolver = moduleRef.get<ClassroomResolver>(ClassroomResolver);
        classroomService = moduleRef.get<ClassroomService>(ClassroomService);
        jest.clearAllMocks();
    })
    describe('getClassroom',()=>{
        it('should return an array of classrooms', async ()=>{
            const result: ClassroomDto[] = [{
                className: "Math",
                classSize: 32
            }];
            jest.spyOn(classroomService, 'findAll').mockImplementation(async ()=>result)
        })
    })
})