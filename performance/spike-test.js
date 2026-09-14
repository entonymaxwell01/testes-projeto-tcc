import http from "k6/http";
import { check, sleep } from "k6";
import { standardThresholds, API_CONFIG } from "./config.js";
import { SharedArray } from "k6/data";

const users = new SharedArray("perf users", function () {
  return JSON.parse(open("./users.json"));
});

export const options = {
  stages: [
    { duration: "10s", target: 200 },
    { duration: "1m", target: 200 },
    { duration: "10s", target: 0 },
  ],
  thresholds: standardThresholds,
};

const BASE_URL = __ENV.API_URL;

export default function () {
  const user = users[__VU % users.length];
  const loginPayload = JSON.stringify({
    email: user.email,
    senha: user.senha,
  });

  const params = {
    headers: API_CONFIG.HEADERS,
  };

  const loginRes = http.post(
    `${API_CONFIG.BASE_URL}/login`,
    loginPayload,
    params,
  );
  check(loginRes, {
    "Login - Status 200": (r) => r.status === 200,
    "Login - Token gerado": (r) => r.json("token") !== undefined,
  });

  if (loginRes.status === 200) {
    const token = loginRes.json("token");

    const projetosParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const projetosRes = http.get(
      `${API_CONFIG.BASE_URL}/projetos`,
      projetosParams,
    );

    check(projetosRes, {
      "Projetos - Status 200": (r) => r.status === 200,
    });
  }

  sleep(1);
}
