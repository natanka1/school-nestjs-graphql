import { ClassroomSchema } from "../../schemas/classroom.schema"

export const classroomStub = (): ClassroomSchema => {
    return {
        name: "Java",
        size: 24
    }
}