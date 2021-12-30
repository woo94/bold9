import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const createUsers = await prisma.user.createMany({
        data: [
            { email: 'hazel@gmail.com', password: 'hazelhazel', name: 'hazel' },
            { email: 'amelia@gmail.com', password: 'ameliaamelia', name: 'amelia' },
            { email: 'lily@gmail.com', password: 'lilylily', name: 'lily' },
            { email: 'grace@gmail.com', password: 'gracegrace', name: 'grace' },
            { email: 'oliver@gmail.com', password: 'oliveroliver', name: 'oliver' },
            { email: 'liam@gmail.com', password: 'liamliam', name: 'liam' },
            { email: 'lucas@gmail.com', password: 'lucaslucas', name: 'lucas' },
            { email: 'bestman21c@gmail.com', password: 'andrewandrew', name: 'andrew' }
        ]
    })

    const createPosts = await prisma.post.createMany({
        data: [
            { title: 'hazel init', content: 'this is goood', authorId: 1 },
            { title: 'hazel boring', content: 'anyone to play with?', authorId: 2 },
            { title: 'taking a test', content: 'very very tough!', authorId: 8 }
        ]
    })

    console.log(createUsers, createPosts)
}

main().catch(err => {
    console.error(err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})