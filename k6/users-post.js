import { check } from "k6";
import exec from "k6/execution";
import http from "k6/http";
import { buildOptions } from "./lib/config.js";
import { jsonHeaders, url } from "./lib/http.js";

export const options = buildOptions("users_post");

export default function () {
  const unique = `${Date.now()}-${exec.vu.idInTest}-${exec.vu.iterationInInstance}`;
  const payload = JSON.stringify({
    name: `bench-${unique}`,
    email: `bench-${unique}@test.local`,
  });

  const res = http.post(url("/api/users"), payload, jsonHeaders);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "payload has id": (r) => {
      const body = r.json();
      return body && body.id !== undefined;
    },
    "payload has created_at": (r) => {
      const body = r.json();
      return body && body.created_at !== undefined;
    },
  });
}
