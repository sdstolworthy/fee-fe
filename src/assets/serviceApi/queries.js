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
