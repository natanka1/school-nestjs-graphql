import { Classroom } from "../../schemas/classroom.schema"

export const classroomStub = (): Classroom => {
    return {
        className: "Java",
        classSize: 24
    }
}