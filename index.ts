import { PrismaClient, User, Post } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server'

const prisma = new PrismaClient()

const typeDefs = gql`
    type User {
        id: Int
        email: String
        password: String
        name: String
        createdAt: String
        posts: [Post]
    }

    type Post {
        id: Int
        title: String
        content: String
        published: Int
        createdAt: String
        authorId: Int
        comments: [Comment]
    }

    type Comment {
        id: Int
        content: String
        createdAt: String
        postId: String
    }

    type Query {
        findUser(id: Int!): User
        # createUser(): User
        # writePost(): Post
        # writeComment(): Comment
    }

    # type Mutation {
    #     addUser(): void
    #     addPost(): void
    #     addComment(): void
    # }
`

const resolvers = {
    User: {
        posts: (parent: User) => {
            return prisma.post.findMany({
                where: {
                    authorId: parent.id,
                    published: true
                }
            })
        }
    },

    Post: {
        comments: (parent: Post) => {
            return prisma.comment.findMany({
                where: {
                    postId: parent.id
                }
            })
        }
    },

    Query: {
        findUser: (_: any, __: { id: number }) => {
            return prisma.user.findUnique({
                where: {
                    id: __.id
                }
            })
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen(8080).then(() => {
    console.log('server running')
})