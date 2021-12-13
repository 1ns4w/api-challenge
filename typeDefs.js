const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Post {
        id: ID
        title: String
        description: String
        image: String # this should be a URL to where the actual image is stored
        votes: Int
    }

    type Usuario { # users have to be authenticated and provided authorization to all post mutations
        id: ID
        email: String 
        password: String
        name: String
    }

    type Query {
        getAllPosts: [Post] # listar todos los posts
        getPost(id: ID): Post  # listar un solo post (por id)
        # sugerencia: getVotedPosts (para ver actividad del usuario *historial de posts votados*)
        # para la actividad del usuario habria que hacer un listado del usuario asociado a un voto
    }

    input UserInput { # input para mutation (Login)
        email: String
        password: String
    }

    input PostInput { # input para mutations (createPost y updatePost)
        title: String
        description: String
        image: String
    }

    type Mutation {
        Login(input: UserInput): String # return JSON for jwt authentication (no terminado *no funciona*)
        RegisterUser(input: UserInput, name: String): User
        createPost(input: PostInput): Post # returns created Post
        deletePost(id: ID): String # returns some confirmation message
        updatePost(id: ID, input: PostInput): Post # returns updated post
        votePost(id: ID): Post # returns voted post (imprimir votos actuales y id de post)
        unvotePost(id: ID): Post #returns unvoted post 8imprimir votos actuales y id de post)
    }
`

module.exports = typeDefs