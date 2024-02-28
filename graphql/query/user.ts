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
    }
  }
`)
