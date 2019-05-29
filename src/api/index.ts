import request from "../service";
import { makeParams } from "../config/functions";
/**
 *  Get Venues
 * @param optionsIn
 */
export const getBestThreeVenues = async (search: string) => {
  /**
   *  Default Params If Any
   */
  const defaultParams = {
    query: "lunch",
    v: 20170801,
    limit: 3
  };
  /**
   *  Params from User Inputs
   */
  const requestParams = {
    ...defaultParams,
    near: search
  };
  const queryString = makeParams(requestParams);

  const options = {
    options: {
      url: `/venues/search${queryString}`
    }
  };

  const { data: { response: { venues = [] } = {} } = {} } = await request(
    options
  );

  const selectedVenues = venues.map((venue: any) => {
    const { id, location, name } = venue;
    return {
      id,
      location,
      name,
      rating: 0
    };
  });

  return selectedVenues;
};
