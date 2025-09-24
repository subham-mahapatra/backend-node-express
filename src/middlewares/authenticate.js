// import passport from 'passport';
// import httpStatus from 'http-status';
// import APIError from '~/utils/apiError';
// import Role from '~/models/roleModel';

// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
// 	if (err || info || !user) {
// 		return reject(new APIError(httpStatus[httpStatus.UNAUTHORIZED], httpStatus.UNAUTHORIZED));
// 	}
// 	req.user = user;
// 	if (requiredRights.length) {
// 		const userRights = [];
// 		const roles = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
// 		roles.forEach((i) => {
// 			i.permissions.forEach((j) => {
// 				userRights.push(`${j.controller}:${j.action}`);
// 			});
// 		});
// 		const hasRequiredRights = requiredRights.every((r) => userRights.includes(r));
// 		//console.log('requiredRights: ', requiredRights);
// 		//console.log('userRights: ', userRights);
// 		//console.log('boolean: ', hasRequiredRights);
// 		if (!hasRequiredRights) {
// 			return reject(new APIError('Resource access denied', httpStatus.FORBIDDEN));
// 		}
// 	}
// 	return resolve();
// };

// const authenticate =
// 	(...requiredRights) =>
// 	async (req, res, next) => {
// 		return new Promise((resolve, reject) => {
// 			passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
// 		})
// 			.then(() => next())
// 			.catch((err) => next(err));
// 	};

// export default authenticate;
// middlewares/authenticate.js
import passport from 'passport';
import httpStatus from 'http-status';
import APIError from '~/utils/apiError';
import Role from '~/models/roleModel';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    // Instead of rejecting with APIError, reject with a formatted error object
    return reject({
      success: false,
      data: {},
      message: 'Please authenticate to access this resource',
      statusCode: httpStatus.UNAUTHORIZED
    });
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = [];
    const roles = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
    roles.forEach((role) => {
      role.permissions.forEach((perm) => {
        // Assuming permission has `controller` and `action` fields
        userRights.push(`${perm.controller}:${perm.action}`);
      });
    });

    const hasRequiredRights = requiredRights.every((r) => userRights.includes(r));
    if (!hasRequiredRights) {
      return reject({
        success: false,
        data: {},
        message: 'Resource access denied',
        statusCode: httpStatus.FORBIDDEN
      });
    }
  }

  return resolve();
};

const authenticate =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((error) => {
        // Format the response to your standard
        const statusCode = error.statusCode || httpStatus.UNAUTHORIZED;
        return res.status(statusCode).json({
          success: false,
          data: {},
          message: error.message || 'Authentication failed'
        });
      });
  };

export default authenticate;