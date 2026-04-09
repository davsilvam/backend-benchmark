import { check } from "k6";
import http from "k6/http";
import { buildOptions } from "./lib/config.js";
import { url } from "./lib/http.js";

export const options = buildOptions("health");

export default function () {
  const res = http.get(url("/api/health"));

  check(res, {
    "status is 200": (r) => r.status === 200,
    "payload has status ok": (r) => {
      const body = r.json();
      return body && body.status === "ok";
    },
  });
}
