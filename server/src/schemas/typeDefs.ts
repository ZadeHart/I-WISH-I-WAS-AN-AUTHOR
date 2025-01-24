const typeDefs = `

    type User {
        _id: ID!
        username: string
        email: string
        bookCount: INT
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID!
        authors: String[]!
        description: String!
        title: String!
        image: String!
        link: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input AddUserInput {
        username: String!
        email: String!
        password: String!
    }

    input SaveBookInput {
        authors: String[]!
        description: String!
        title: String!
        bookId: String!
        image: String!
        link: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(input: AddUserInput!): Auth
        saveBook(input: SaveBookInput!): User
        removeBook(bookId: String!): User
    }
    `;

    export default typeDefs;

// type User {
//     _id: ID!
//     username: String!
//     email: String!
//     savedBooks: [Book]
//     }
    
//     type Book {
//         bookId: ID!
//         title: String!
//         authors: [String!]
//     }
    
//     type AuthPayload {
//         token: String!
//         user: User!
//     }
    
//     type Query {
//         getSingleUser(id: ID, username: String): User
//     }
    
//     type Mutation {
//         createUser(username: String!, email: String!, password: String!): AuthPayload
//         login(username: String, email: String, password: String!): AuthPayload
//         saveBook(book: BookInput!): User
//         deleteBook(bookId: ID!): User
//     }
    
//     input BookInput {
//         bookId: ID!
//         title: String!
//         authors: [String!]
//     }
