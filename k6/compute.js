import { check } from "k6";
import http from "k6/http";
import { buildOptions } from "./lib/config.js";
import { url } from "./lib/http.js";

const n = __ENV.COMPUTE_N || "40";

export const options = buildOptions("compute");

export default function () {
  const res = http.get(url(`/api/compute?n=${n}`));

  check(res, {
    "status is 200": (r) => r.status === 200,
    "payload has numeric result": (r) => {
      const body = r.json();
      return body && Number.isInteger(body.result);
    },
  });
}
