import type {
  CTRSearchQueryWithClicksResponse,
  SearchResponseBody,
} from "./client/types.gen";
import { DATASET_ID, trieve } from "./trieve";

for (let i = 0; i < 20; i++) {
  const results = (await trieve.fetch("/api/chunk/search", "post", {
    data: {
      query: "create chunk group",
      search_type: "fulltext",
      // extend_results: true,
      score_threshold: 0.2,
      // filters: {
      //   must_not: [
      //     {
      //       field: "tag_set",
      //       match: ["code"],
      //     },
      //   ],
      // },
      page_size: 20,
    },
    xApiVersion: "V2",
    datasetId: DATASET_ID,
  })) as SearchResponseBody;

  console.log(results.chunks[Math.min(i, results.chunks.length - 1)].chunk.id);

  // Click on a result
  const response = await trieve.fetch("/api/analytics/ctr", "put", {
    data: {
      ctr_type: "search",
      position: 2,
      clicked_chunk_id:
        results.chunks[Math.min(i, results.chunks.length - 1)].chunk.id,
      request_id: results.id as string,
    },
    datasetId: DATASET_ID,
  });

  console.log(response);
}

const ctrResults = (await trieve.fetch("/api/analytics/ctr", "post", {
  data: {
    type: "recommendations_with_clicks",
  },
  datasetId: DATASET_ID,
})) as CTRSearchQueryWithClicksResponse;

console.log(ctrResults.queries[0].query);
