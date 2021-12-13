const Post = require("./models/Post.model")

const resolvers = {
    Query: {
        getAllPosts: async () => {
            return await Post.find()
        },
        getPost: async (_parent, {id}, _context, _info) => { /* args can also be unpacked ( hence consider using {id} instead of args) */
            return await Post.findById(id);
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const {email, password} = args.input
            const {name} = args
            const user = new User({ email, password, name })
            await user.save()
            return user
        },
        createPost: async (parent, args, context, info) => {
            const { title, description, image} = args.input
            const votes = 0
            const post = new Post({ title, description, image, votes})
            await post.save()
            return post
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args /* add .* when a post is returned*/
            await Post.findByIdAndDelete(id)
            return `Post identified by ${id} was succesfully deleted from the database.`
        },
        updatePost: async (parent, args, context, info) => {
            /* users are commonly not allowed to update images but title and description */
            const {id} = args
            const {title, description, image} = args.input
            /* validation is handled by graphql (if input ain't provided, current remains) */
            const post = await Post.findByIdAndUpdate(id, {title, description, image}, {new: true});
            return post

        },
        /* vote mutations may cause issues related to negative votes and multiple votes (this works for apps such as Reddit tho)
            las siguientes mutaciones no funcionan */
        votePost: async (parent, args, context, info) => {
            const {id} = args;
            const tempPost = await Post.findById(id);
            let votes = tempPost.votes + 1; /*no encontre documentacion de como acceder al atributo */
            const post = await tempPost.findByIdAndUpdate(id, {votes}, {new: true});
            return post
        },
        unvotePost: async (parent, args, context, info) => {
            const {id} = args;
            const tempPost = await Post.findById(id);
            let votes = tempPost.votes - 1; /*no encontre documentacion de como acceder al atributo */
            const post = await tempPost.findByIdAndUpdate(id, {votes}, {new: true});
            return post
        }
    }
}

module.exports = resolvers