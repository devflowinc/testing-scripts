import { trieve } from "./trieve";

const DATASET_ID = "c65a2dd7-298e-48e6-ac90-e336ccbbe74f";

const response = await trieve.fetch("/api/chunk", "post", {
  trDataset: DATASET_ID,
  requestBody: [
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
