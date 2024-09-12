import { DATASET_ID, trieve } from "./trieve";

const response = await trieve.fetch("/api/chunk", "post", {
  datasetId: DATASET_ID,
  data: [
    {
      chunk_html: "Dogs Cats Animals",
      semantic_content: "use me to embed",
    },
    {
      chunk_html: "No really use me",
    },
  ],
});

console.log(response);
