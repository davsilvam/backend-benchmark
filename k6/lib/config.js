const PROFILE = (__ENV.K6_PROFILE || "smoke").toLowerCase();

const PROFILES = {
  smoke: {
    executor: "constant-vus",
    vus: 3,
    duration: "20s",
  },
  load: {
    executor: "ramping-vus",
    startVUs: 10,
    stages: [
      { duration: "30s", target: 50 },
      { duration: "60s", target: 100 },
      { duration: "30s", target: 50 },
    ],
    gracefulRampDown: "10s",
  },
  stress: {
    executor: "ramping-vus",
    startVUs: 20,
    stages: [
      { duration: "30s", target: 100 },
      { duration: "30s", target: 200 },
      { duration: "30s", target: 300 },
      { duration: "30s", target: 200 },
      { duration: "30s", target: 100 },
    ],
    gracefulRampDown: "10s",
  },
};

export function buildOptions(testName) {
  const scenario = PROFILES[PROFILE] || PROFILES.smoke;

  return {
    scenarios: {
      [testName]: {
        ...scenario,
      },
    },
    thresholds: {
      http_req_failed: ["rate<0.05"],
    },
    summaryTrendStats: ["avg", "med", "p(95)", "p(99)", "min", "max"],
  };
}
