import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userFactory = (name: string, email?: string) => {
    return {
        email: email ?? `${name}@gmail.com`,
        name,
        password: `${name}${name}`
    }
}

const postFactory = (title: string, content: string, authorId: number, published: boolean = true) => {
    return {
        title,
        content,
        authorId,
        published
    }
}

const commentFactory = (postId: number, content: string) => {
    return {
        postId,
        content
    }
}

async function main() {
    await prisma.user.createMany({
        data: [
            userFactory('hazel'),
            userFactory('amelia'),
            userFactory('lily'),
            userFactory('grace'),
            userFactory('oliver'),
            userFactory('liam'),
            userFactory('lucas'),
            userFactory('andrew', 'bestman21c@gmail.com')
        ]
    })

    await prisma.post.createMany({
        data: [
            postFactory('hazle say hi', 'hi my name is hazel. i am new here', 1),
            postFactory('hazle boring', 'anyone to play with?', 1),
            // create posts with content contains graphql and published false/true
            postFactory("who's got cheatsheet?", 'help me with graphql!!!!', 8, false),
            postFactory("taking a test", "graphql is tough. actually all other stuff is tough either", 8, true)
        ]
    })

    await prisma.comment.createMany({
        data: [
            commentFactory(3, 'email me'),
            commentFactory(3, 'here is a link. it will help you a lot'),
            commentFactory(4, 'cheer up andrew T.T')
        ]
    })
}

main().catch(err => {
    console.error(err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})