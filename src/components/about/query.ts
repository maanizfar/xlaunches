import { gql } from "@apollo/client";

export const QUERY_COMPANY = gql`
  query CompanyInfo {
    company {
      name
      summary
      founded
      founder
      ceo
      coo
      cto
      cto_propulsion
      valuation
      employees
      headquarters {
        address
        city
        state
      }
      links {
        elon_twitter
        flickr
        twitter
        website
      }
    }
  }
`;
