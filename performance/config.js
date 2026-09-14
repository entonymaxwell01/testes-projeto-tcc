export const standardThresholds = {
  http_req_duration: ["p(95)<500"],
  http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
};

export const smokeThresholds = {
  http_req_duration: ["p(99)<200"],
  http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
};

export const API_CONFIG = {
  BASE_URL: __ENV.API_URL,
  HEADERS: {
    "Content-Type": "application/json",
  },
};
