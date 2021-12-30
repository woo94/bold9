import prisma from './client'

interface CreateUser {
    email: string
    password: string
    name: string
}

export async function createUser(user: CreateUser) {
    try {
        return await prisma.user.create({
            data: user
        })
    }
    catch (e) {
        throw e
    }
}

interface WritePost {
    title: string
    content: string
    published: boolean
    authorId: number
}

export async function writePost(post: WritePost) {
    try {
        return await prisma.post.create({
            data: post
        })
    }
    catch (e) {
        throw e
    }
}

interface WriteComment {
    content: string
    postId: number
}

export async function writeComment(comment: WriteComment) {
    try {
        return await prisma.comment.create({
            data: comment
        })
    }
    catch (e) {
        throw e
    }
}