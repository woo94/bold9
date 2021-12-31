import { PrismaClient, User, Post } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const {
    PORT
} = process.env

const prisma = new PrismaClient()

const typeDefs = gql`
    type User {
        id: Int!
        email: String
        password: String
        name: String
        createdAt: String
        posts: [Post]
    }

    type Post {
        id: Int!
        title: String
        content: String
        published: Int
        createdAt: String
        authorId: Int
        comments: [Comment]
    }

    type Comment {
        id: Int!
        content: String
        createdAt: String
        postId: String
    }

    type Query {
        findUsers: [User]
    }

    type Mutation {
        createUser(email: String!, password: String!, name: String!): User
        writePost(title: String!, content: String!, published: Boolean!, authorId: Int!): Post
        writeComment(content: String!, postId: Int!): Comment
    }
`

const resolvers = {
    // default resolvers are used for resolver chains
    // ex) Query.findUsers() -> User.posts() -> Post.title(), Post.content(), Post.comments() -> Comment.content()
    Query: {
        findUsers: () => {
            return prisma.user.findMany({
                // get user records where at least one related post published: true
                where: {
                    posts: {
                        some: {
                            published: true
                        }
                    }
                },
                // use relation filters(filter on "-to-many" relations)
                include: {
                    posts: {
                        where: {
                            content: {
                                contains: 'graphql'
                            }
                        },
                        // nested reads to related comments
                        include: {
                            comments: true
                        }
                    }
                }
            })
        }
    },

    Mutation: {
        createUser: (_: any, params: { email: string, password: string, name: string }) => {
            const { email, password, name } = params
            return prisma.user.create({
                data: {
                    email,
                    password,
                    name
                }
            })
        },
        writePost: (_: any, params: { title: string, content: string, published: boolean, authorId: number }) => {
            const { title, content, published, authorId } = params
            return prisma.post.create({
                data: {
                    title,
                    content,
                    published,
                    authorId
                }
            })
        },
        writeComment: (_: any, params: { content: string, postId: number }) => {
            const { content, postId } = params
            return prisma.comment.create({
                data: {
                    content,
                    postId
                }
            })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // use ApolloServerPluginLandingPageGraphQLPlayground() to set landing page to GraphQL Playground
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen(
    PORT ? +PORT : 2080
).then(() => {
    console.log('server running')
})