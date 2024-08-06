import type { SearchResponseBody } from "./client/types.gen";
import { DATASET_ID, trieve } from "./trieve";

const results = (await trieve.fetch("/api/chunk/search", "post", {
  requestBody: {
    // Get random query
    query: "This should have no results",
    // Random search type
    search_type: "fulltext",
    score_threshold: 2000,
  },
  xApiVersion: "V2",
  trDataset: DATASET_ID,
})) as SearchResponseBody;

console.log(results);
