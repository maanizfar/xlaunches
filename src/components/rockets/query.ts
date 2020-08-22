import { gql } from "@apollo/client";

const ROCKETS_QUERY = gql`
  query Rockets {
    rockets {
      name
      description
      first_flight
      active
      boosters
      cost_per_launch
      success_rate_pct
      wikipedia
      engines {
        number
        propellant_1
        propellant_2
        thrust_vacuum {
          kN
        }
        thrust_to_weight
        thrust_sea_level {
          kN
        }
        type
      }
      mass {
        kg
      }
      diameter {
        meters
      }
      height {
        meters
      }
    }
  }
`;
