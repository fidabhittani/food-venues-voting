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
