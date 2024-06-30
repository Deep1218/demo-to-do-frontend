export class Constants {
  public static readonly API_URL = process.env.REACT_APP_API_URL;
}

export class APIRoutes {
  public static readonly USERS = {
    SIGNIN: "/user/sign_in",
    SIGNUP: "/user/sign_up",
    DELETE: "/user/",
    LOGOUT: "/user/logout",
  };
}
