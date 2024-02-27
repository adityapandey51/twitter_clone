import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query Query($token: String!) {
    verifyGoogleAuthToken(token: $token)
  }
`);
