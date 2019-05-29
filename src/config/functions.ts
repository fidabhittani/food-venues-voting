const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const client_id = process.env.REACT_APP_CLIENT_ID;

const commonParams = { client_secret, client_id };

/**
 *  Serialise the params object into a string query
 * @param param
 */
const serializeParams = (param: any) => {
  return (
    "?" +
    Object.keys(param)
      .reduce((a: any, k: any) => {
        a.push(k + "=" + encodeURIComponent(param[k]));
        return a;
      }, [])
      .join("&")
  );
};

/**
 *  Create string query with credentials
 * @param params
 */

export const makeParams = (params: any) => {
  return serializeParams({
    ...params,
    ...commonParams
  });
};

/**
 *  Get Initial Votes
 */

export const getInitialVotes = (venues: any) => {
  return venues.reduce((votes: any, next: any) => {
    if (!votes[next.id]) {
      votes[next.id] = 0;
    }
    return votes;
  }, {});
};

/**
 *  Get Votes
 */

export const getVotes = (userVotes: any, initialVotes: any) => {
  return userVotes.reduce((venueVotes: any, user: any) => {
    const { votes } = user;
    const [voteVenue]: any = votes.filter((venue: any) => venue.vote);
    if (voteVenue) {
      venueVotes[voteVenue.placeId] = venueVotes[voteVenue.placeId] + 1;
    }
    return venueVotes;
  }, initialVotes);
};

/**
 *  Get Max Votes Venue
 */

export const getMaxVoteVenue = (currentVotes: any) => {
  return Object.keys(currentVotes).reduce(
    (max, key) => {
      if (currentVotes[key] > max.count) {
        max = {
          count: currentVotes[key],
          key
        };
      }
      return max;
    },
    { count: 0, key: "" }
  );
};

/**
 *  Update Venues Ratings
 */

export const updateVenuesRatings = (
  venues: any,
  currentVotes: any,
  maxVotesVenue: any
) => {
  return venues.map((venue: any) => {
    return {
      ...venue,
      rating: currentVotes[venue.id] ? currentVotes[venue.id] : 0,
      active: maxVotesVenue.key === venue.id ? true : false
    };
  });
};

/**
 *  Update Venues Ratings
 */

export const updateUserVotes = (venues: any, userVotes: any, vote: any) => {
  const searchUser = (user: any) => user.userId === vote.userId;

  const user = userVotes.find(searchUser);
  if (user) {
    const userIndex = userVotes.findIndex(searchUser);
    const updatedUser = {
      ...user,
      votes: venues.map((venue: any) => {
        return {
          userId: vote.userId,
          placeId: venue.id,
          vote: venue.id === vote.placeId
        };
      })
    };
    userVotes[userIndex] = {
      ...updatedUser
    };
    return userVotes;
  }
  return null;
};
