import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation CreateUser($input: AddUserInput!) {
  createUser(input: $input) {
    token
    user {
      username
      email
    }
  }
}
`;

export const SAVE_BOOK = gql `
    mutation Mutation($input: SaveBookInput) {
        saveBook(input: $input) {
            book {
                _id
                username
                savedBooks {
                    bookId
                    title
                    authors
            }
        }
    }
}
`;

export const REMOVE_BOOK = gql `
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            book {
                bookId
            }
        }
    }
`;