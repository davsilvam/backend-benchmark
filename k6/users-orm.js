import { check } from "k6";
import http from "k6/http";
import { buildOptions } from "./lib/config.js";
import { url } from "./lib/http.js";

export const options = buildOptions("users_orm");

export default function () {
  const res = http.get(url("/api/users"));

  check(res, {
    "status is 200": (r) => r.status === 200,
    "payload is array": (r) => Array.isArray(r.json()),
  });
}
