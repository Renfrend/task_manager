import ConfigProps from './config.interface';

export default (): ConfigProps => ({
  jwtAccess: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  },
});
