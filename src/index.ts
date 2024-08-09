import { Trieve } from "./client/index";

const trieve = new Trieve({
  apiKey: "admin",
  baseUrl: "http://localhost:8090",
  debug: false,
});

const org = await trieve.fetch("/api/organization", "post", {
  data: {
    name: "Test-org",
  },
});

const members = await trieve.fetch(
  "/api/organization/users/{organization_id}",
  "get",
  {
    organizationId: org.id,
  },
);

console.log(members[0]);

// const got_org = await trieve.fetch(
//   "/api/organization/{organization_id}",
//   "get",
//   {
//     organizationId: org.id,
//     trOrganization: org.id,
//   },
// );

// console.log(got_org);

// const test = await trieve.fetch("/api/dataset/{dataset_id}", "get", {
//   datasetId: "c65a2dd7-298e-48e6-ac90-e336ccbbe74f",
//   trDataset: "c65a2dd7-298e-48e6-ac90-e336ccbbe74f",
// });
//
// console.log(test);
