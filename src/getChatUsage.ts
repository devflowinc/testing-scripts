import { DATASET_ID, formatDateForApi, trieve } from "./trieve";

const result = await trieve.fetch<"eject">("/api/analytics/rag", "post", {
  data: {
    type: "rag_usage_graph",
    filter: {
      date_range: {
        // 5 mins ago
        gt: formatDateForApi(new Date(Date.now() - 5 * 60 * 1000)),
      },
    },
    granularity: "minute",
  },
  datasetId: DATASET_ID,
});

console.log(result);
