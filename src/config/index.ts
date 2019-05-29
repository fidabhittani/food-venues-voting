const API_VERSION = `v2`;

export const API_END_POINT =
  process.env.NODE_ENV === "development"
    ? ""
    : `https//api.foursquare.com/${API_VERSION}`;
