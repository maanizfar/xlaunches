import gql from "graphql-tag";

export const LAUNCH_QUERY = gql`
  query LaunchInfo($id: ID!) {
    launch(id: $id) {
      id
      mission_id
      mission_name
      rocket {
        rocket_name
        rocket {
          country
        }
        second_stage {
          payloads {
            customers
          }
        }
      }
    }
  }
`;
