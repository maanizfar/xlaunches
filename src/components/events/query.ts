import { gql } from "@apollo/client";

const EVENTS_QUERY = gql`
  query Events($limit: Int, $offset: Int, $order: String, $sort: String) {
    histories(limit: $limit, offset: $offset, order: $order, sort: $sort) {
      title
      details
      event_date_utc
      flight {
        links {
          video_link
        }
      }
    }
  }
`;
