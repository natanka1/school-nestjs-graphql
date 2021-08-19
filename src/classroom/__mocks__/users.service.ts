import { classroomStub } from "../test/stubs/user.stub";

export const ClssroomService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(classroomStub()),
    getUsers: jest.fn().mockResolvedValue([classroomStub()]),
    createUser: jest.fn().mockResolvedValue(classroomStub()),
    updateUser: jest.fn().mockResolvedValue(classroomStub())
})