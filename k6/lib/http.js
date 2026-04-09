const base = (__ENV.BASE_URL || "http://localhost:8080").replace(/\/$/, "");

export function url(path) {
  return `${base}${path}`;
}

export const jsonHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};
