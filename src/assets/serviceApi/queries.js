import gql from 'graphql-tag';

export const GET_WORKSHOPS = gql`
  query Practices{
    practices {
      title
      subtitle
      slug
      coverImage
      authors {
        id
        firstName
        lastName
        mediaLink
      }
      tags {
        tag
      }
      upvotes
      ama {
        question
      }
    }
  }
`;

export const GET_WORKSHOP = gql`
  query Practices ($post: String!) {
    practices(where: { slug: $post } ) {
      title
      subtitle
      body {
        fullText
      }
      authors {
        id
        firstName
        lastName
        mediaLink
        Avatar
      }
      body {
        whyDo
        whatIs
        howTo
      }
      createdAt
      updatedAt
      resources {
        description
        linkType
        link
      }
      upvotes
      coverImage
      mediaGallery {
        link
      }
      tags {
        tag
      }
      ama {
        question
        answers {
          answer
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query user ($id: ID!) {
    user(id: $id) {
      username
      email
      firstName
      lastName
      Avatar 
    }
  }
`;

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(
      input: { identifier: $identifier, password: $password }
    ) {
      jwt
      user {
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
      }
    }
  }
`;
