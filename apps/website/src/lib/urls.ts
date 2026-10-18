const DEFAULT_WEB_APP_URL = "http://localhost:3000";

export const WEB_APP_URL = (
  process.env.NEXT_PUBLIC_WEB_APP_URL ?? DEFAULT_WEB_APP_URL
).replace(/\/$/, "");

export const webAppUrls = {
  login: `${WEB_APP_URL}/login`,
  signup: `${WEB_APP_URL}/signup`,
  demo: `${WEB_APP_URL}/cart`,
};
