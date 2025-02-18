import axiosLib from "axios";
import * as https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const httpClient = axiosLib.create({
  httpsAgent: agent,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const qiHttpClient = axiosLib.create({
  httpsAgent: agent,
  auth: {
    username: process.env.QI_API_USER!,
    password: process.env.QI_API_PASS!,
  },
  headers: {
    "Content-Type": "application/json",
    "X-Terminal-Id": process.env.QI_TERMINAL_ID,
  },
  timeout: 10000,
});

export default httpClient;
