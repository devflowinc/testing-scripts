import { Trieve } from "./client/index";

export const trieve = new Trieve({
  apiKey: "admin",
  baseUrl: "http://localhost:8090",
  debug: false,
});

export const DATASET_ID = "c65a2dd7-298e-48e6-ac90-e336ccbbe74f";

export const formatDateForApi = (date: Date) => {
  return date
    .toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })
    .replace(",", "");
};
