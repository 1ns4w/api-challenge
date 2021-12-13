// modules
const express = require("express");
const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-express");

// files
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")


async function startServer () {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
    
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })

    app.use((req, res) => {
        res.send("Hello from Express Apollo server")
    })

    // para correr mongoose debes tener mongodb instalado e inicializado usando *sudo service mongod start*
    await mongoose.connect("mongodb://localhost:27017/api_challenge_db", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    console.log("Mongoose connected...")
    
    /* en esta direccion accederas al sandbox en el cual puedes probar la API (es similar a playground, lo unico que cambia es la UI) */
    app.listen(4000, () => console.log(`Server running in http://localhost:4000`))
}

startServer();