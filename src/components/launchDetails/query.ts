import { gql } from "@apollo/client";

export const QUERY_LAUNCHDETAILS = gql`
  query LaunchDetails($id: ID!) {
    launch(id: $id) {
      mission_name
      details
      upcoming
      is_tentative
      launch_date_local
      launch_success
      launch_site {
        site_name_long
      }
      links {
        mission_patch
        flickr_images
        video_link
        wikipedia
      }
      telemetry {
        flight_club
      }
      rocket {
        rocket_name
        fairings {
          recovered
          recovery_attempt
          reused
          ship
        }
        first_stage {
          cores {
            core {
              missions {
                flight
                name
              }
              asds_attempts
              asds_landings
              block
              id
              original_launch
              reuse_count
              rtls_attempts
              rtls_landings
              status
              water_landing
            }
            flight
            gridfins
            land_success
            landing_intent
            landing_type
            landing_vehicle
            legs
            reused
          }
        }
        second_stage {
          payloads {
            manufacturer
            nationality
            customers
            orbit
            payload_type
            reused
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
    }
  }
`;
