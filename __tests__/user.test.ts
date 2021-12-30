import { createUser, writePost, writeComment } from '../functions-without-context'
import { prismaMock } from '../singleton'

test('should create new user', async () => {
    const date = new Date()
    const user = {
        id: 1,
        email: 'name@gmail.com',
        password: 'namename',
        name: 'name',
        createdAt: date
    }

    prismaMock.user.create.mockResolvedValue(user)

    await expect(createUser(user)).resolves.toEqual({
        id: 1,
        email: 'name@gmail.com',
        password: 'namename',
        name: 'name',
        createdAt: date
    })
})