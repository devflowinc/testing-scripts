import { DATASET_ID, formatDateForApi, trieve } from "./trieve";

const result = await trieve.fetch<"eject">("/api/analytics/search", "post", {
  data: {
    type: "search_usage_graph",
    filter: {
      date_range: {
        // 14 days ago
        gt: formatDateForApi(new Date(Date.now() - 5 * 60 * 1000)),
      },
    },
    granularity: "minute",
  },
  datasetId: DATASET_ID,
});

console.log(result);
