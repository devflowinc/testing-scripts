/* eslint-disable @typescript-eslint/no-explicit-any */
import type { $OpenApiTs, RagQueryEvent } from "./types.gen";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
type Paths = keyof $OpenApiTs;
type MethodsForPath<P extends Paths> = keyof $OpenApiTs[P];

type SuccessStatusCode =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;

type RequestParams<
  P extends Paths,
  M extends MethodsForPath<P>,
> = $OpenApiTs[P][M] extends { req: infer R } ? R : never;

type ResponseBody<
  P extends Paths,
  M extends MethodsForPath<P>,
> = $OpenApiTs[P][M] extends { res: infer R }
  ? R extends { [K in SuccessStatusCode]?: any }
    ? R[Extract<keyof R, SuccessStatusCode>]
    : never
  : never;

type EjectOption = "eject" | false;

type EjectedRequestBase<T> = {
  trDataset?: string;
  requestBody?: T;
  [key: string]: any;
};

function camelcaseToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Convert camelcase to snake case and replace
function replacePathParams(
  path: string,
  params: Record<string, string>,
): string {
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`{${camelcaseToSnakeCase(key)}}`, value);
  }
  return path;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

interface TrieveOpts {
  apiKey: string;
  baseUrl: string;
  debug?: boolean;
}

export class Trieve {
  private apiKey: string;
  private datasetId?: string;
  private baseUrl: string;
  private debug: boolean = false;

  constructor(opts: TrieveOpts) {
    this.apiKey = opts.apiKey;
    this.baseUrl = opts.baseUrl;
    this.debug = opts.debug || false;
  }

  async fetch<
    EJECT extends EjectOption = false,
    URQ = EJECT extends "eject" ? EjectedRequestBase<any> : never,
    URE = EJECT extends "eject" ? unknown : never,
    P extends Paths = Paths,
    M extends EJECT extends false
      ? MethodsForPath<P> & HttpMethod
      : any = MethodsForPath<P> & HttpMethod,
  >(
    path: P,
    method: EJECT extends false ? M : HttpMethod,
    params?: EJECT extends false ? RequestParams<P, M> : URQ,
  ): Promise<EJECT extends false ? ResponseBody<P, M> : URE> {
    let requestBody: unknown;
    const headers: Record<string, string> = {};
    const pathParams: Record<string, string> = {};

    if (isObject(params)) {
      if ("requestBody" in params && isObject(params.requestBody)) {
        requestBody = params.requestBody;
      }

      for (const [key, value] of Object.entries(params)) {
        if (key === "trDataset" && typeof value === "string") {
          if (this.debug) {
            console.log("trDataset", value);
          }
          headers["TR-Dataset"] = value;
        } else if (key === "trOrganization" && typeof value === "string") {
          headers["TR-Organization"] = value;
        } else if (key === "xApiVersion" && typeof value === "string") {
          headers["X-API-VERSION"] = value;
        } else if (key !== "requestBody" && typeof value === "string") {
          pathParams[key] = value;
        }
      }
    }

    const updatedPath = replacePathParams(path, pathParams);

    if (this.debug) {
      console.log("path", updatedPath);
      console.log("api-key", this.apiKey);
      console.log("headers", headers);
    }

    const response = await fetch(this.baseUrl + updatedPath, {
      credentials: "include",
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${await response.text()}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.json();
  }
}

// /// USAGE EXAMPLES ///
// // Fully typed!!
//
// const trieve = new Trieve("admin", "http://localhost:8090");
//
// const r0 = await trieve.fetch("/api/file/{file_id}", "delete", {
//   fileId: "293",
//   trDataset: "someDatasetId",
// });
//
// const r1 = await trieve.fetch("/api/events", "post", {
//   requestBody: {
//     page: 2,
//   },
//   trDataset: "someDatasetId",
// });
//
// console.log(r1.events.length);
//
// const r2 = await trieve.fetch("/api/analytics/rag", "post", {
//   requestBody: {
//     type: "rag_queries",
//   },
//   trDataset: "someDatasetId",
// });
//
// // r2's type for thie route is an untagged rust enum, there is no discrimiant, which doesn't play well with typescript
// // so we can eject the type system completely and specify a return type manually
// console.log(r2);
//
// const r2_ejected = (await trieve.fetch<"eject">("/api/analytics/rag", "post", {
//   requestBody: {
//     type: "rag_queries",
//   },
//   trDataset: "someDatasetId",
// })) as RagQueryEvent[];
