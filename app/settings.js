
let METEOR_URL = 'ws://13.59.167.161:80/websocket';
if (process.env.NODE_ENV === 'production') {
  METEOR_URL = 'ws://13.59.167.161:80/websocket'; // your production server url
}

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL,
};

export default settings;
