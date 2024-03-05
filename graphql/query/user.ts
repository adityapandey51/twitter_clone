import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query Query($token: String!) {
    verifyGoogleAuthToken(token: $token)
  }
`);

export const getCurrentUserQuery=graphql(`
  #graphql
  query GetCurrentUser{
    getCurrentUser{
      id
      profileImage
      firstName
      lastName
      email
      tweets{
        id
        content
        imageURL
        author{
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`)

export const getUserByIDQuery=graphql(`
    #graphql
    query GetUserByID($id:ID!){
      getUserByID(id:$id){
        id
        firstName
        lastName
        email
        tweets{
          id
          content
          imageURL
          author{
            id
            firstName
            lastName
            profileImage
          }
        }
      }
    }
`)
