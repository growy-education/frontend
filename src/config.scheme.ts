import Joi from "joi";

export const getJoiScheme = () =>
  Joi.object({
    REACT_APP_STAGE: Joi.string().required(),
    REACT_APP_BACKEND_BASE_URL: Joi.string().required(),
    REACT_APP_GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
  });
