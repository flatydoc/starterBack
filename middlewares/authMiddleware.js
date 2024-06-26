// import ApiError from "../exceptions/apiErrors.js";
// import TokenService from "../sevice/tokenService.js";

// export default function (req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return next(ApiError.UnauthorizedError());
//     }

//     const accessToken = authHeader.split(" ")[1];
//     if (!accessToken) {
//       return next(ApiError.UnauthorizedError());
//     }

//     const userData = new TokenService().validateAccessToken(accessToken);

//     if (!userData) {
//       return next(ApiError.UnauthorizedError());
//     }

//     req.user = userData;
//     next();
//   } catch (error) {
//     return next(ApiError.UnauthorizedError());
//   }
// }

import ApiError from "../exceptions/apiErrors.js";
import TokenService from "../sevice/tokenService.js";

export function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = new TokenService().validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}

export function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return next(ApiError.ForbiddenError());
  }

  next();
}
