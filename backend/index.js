const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
/////////////////node_module//////////////////
const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const app = express();
const http = require('http');
////////////////personal_library//////////////
const typeDefs = require('./gql/gql_schemas');
const resolvers = require('./gql/resolvers');
const logger = require("./logger/winston");
const log = (msg) => logger.info(msg);
/////////////////CONSTANT/////////////////////
const SERVICE_PORT = 5556;

const login = require("./auth/logins");

const cors = require('cors');


const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground:true,
    csrfPrevention: true,
    instrospection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
     ],
    
    // jwt 토큰 확인
    context: async ({req}) => {
        try {
            // console.log('---------------------------무언가 왔음!!----------------------------------------');
            // console.log(req.headers);
            // console.log('-------------------------------------------------------------------');
            // console.log(req.body);
           let user;
             if (
                req.body.query.indexOf("getloginbyID(") === -1 &&
                req.body.query.indexOf("query IntrospectionQuery {") === -1
             
             ){
                 user = await login.checkAuth(req.headers.authorization);
             }
             console.log(JSON.stringify(user));
         return user;
        } catch (error) {
            throw error;
        }
    },
});

apollo.applyMiddleware({
    app
});

const httpServer = http.createServer(app);
app.use(cors());
    
httpServer.listen(SERVICE_PORT, () => { // 0.0.0.0
    console.log(`server start on port ${SERVICE_PORT}`);
    log(`server start on port ${SERVICE_PORT}`);
});
