// helpers/auth.js

import Cookies from "js-cookie";

const jwtToken = Cookies.get("authToken");

export const config = {
  headers: {
    Authorization: "Bearer " + jwtToken,
  },
};
