import { DATASET_ID, trieve } from "./trieve";

const response = await trieve.fetch("/api/chunk/search", "post", {
  datasetId: DATASET_ID,
  data: {
    search_type: "semantic",
    query: [
      {
        query: "apple",
        weight: 0.75,
      },
      {
        query: "tree",
        weight: 0.23,
      },
    ],
  },
});

console.log(response);
