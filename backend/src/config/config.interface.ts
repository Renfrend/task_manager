export default interface ConfigProps {
  jwtAccess: {
    secret?: string;
    expiresIn?: string;
  };
}
