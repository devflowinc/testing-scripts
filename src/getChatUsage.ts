import { DATASET_ID, formatDateForApi, trieve } from "./trieve";

const result = await trieve.fetch<"eject">("/api/analytics/rag", "post", {
  requestBody: {
    type: "rag_usage_graph",
    filter: {
      date_range: {
        // 5 mins ago
        gt: formatDateForApi(new Date(Date.now() - 5 * 60 * 1000)),
      },
    },
    granularity: "minute",
  },
  trDataset: DATASET_ID,
});

console.log(result);
