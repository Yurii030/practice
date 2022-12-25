const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
    getEmployeeById(
        employeeId: ID!
    ): Employee

    getPostById(
        postId: ID!
    ): [Post]

    getPostsByComIdAndCategory(
        companyId: String!
        category: String!
    ): [Post]

    logInEmployee(
        email: String!
        password: String!
    ): Message
}

type Company {
    companyId: ID!
    name: String!
    address: String!
    phoneNumber: String!
    email: String!
    createdAt: String!
    updatedAt: String
}

type Employee {
    employeeId: ID!
    companyId: Company!
    name: String!
    email: String!
    password: String!
    phoneNumber: String!
    position: String!
    joinAt: String!
    createdAt: String!
    updatedAt: String
}

type Post {
    postId: ID!
    companyId: Company!
    employeeId: Employee!
    title: String
    content: String!
    createdAt: String!
    updatedAt: String
    category: Int!
    refPostId: Post
}

type Message {
    token: String
    employee: Employee
}

type CompanyUpdateResult{
    resultCount: Int!
}

type EmployeeUpdateResult{
    resultCount: Int!
}

type PostUpdateResult{
    resultCount: Int!
}

type Mutation {
    createEmployee(
        name: String!
        email: String!
        companyId: Int!
        password: String
        phoneNumber: String
        position: String
        joinAt: String
    ): PostUpdateResult

    updateEmployeeInfo(
        employeeId: ID!
        companyId: Int
        name: String
        email: String
        password: String
        phoneNumber: String
        position: String
        joinAt: String
    ): Int

    deleteEmployee(
        employeeId: ID!
    ): Int

    createPost                   (
        title: String
        content: String!
        companyId: Int!
        employeeId: Int!
        category: Int!
        refPostId: Int
    ): Int

    updatePost(
        postId: ID!
        title: String
        content: String
    ): Int

    deletePost(
        postId: ID!
    ): Int
}
`;

module.exports = [typeDefs];
