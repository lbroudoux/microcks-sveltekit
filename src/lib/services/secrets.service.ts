/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { httpDeleteWithAuth, httpGetWithAuth, httpPostWithAuth, httpPutWithAuth } from "$lib/http-utils";
import type { Secret } from "../models/secret.model";

export async function getSecrets(page: number = 1, pageSize: number = 20): Promise<Secret[]> {
  // Set options string.
  const options = `page=${page - 1}&size=${pageSize}`;
  return httpGetWithAuth<Secret[]>('/api/secrets?' + options);
}

export async function filterSecrets(filter: string): Promise<Secret[]> {
  // Set options string.
  const options = `name=${filter}`;
  return httpGetWithAuth<Secret[]>('/api/secrets?' + options);
}

export async function countSecrets(): Promise<any> {
  return httpGetWithAuth<any>('/api/secrets/count');
}

export async function createSecret(secret: Secret): Promise<Secret> {
  return httpPostWithAuth<Secret>('/api/secrets', secret);
}

export async function updateSecret(secret: Secret): Promise<Secret> {
  return httpPutWithAuth<Secret>('/api/secrets/' + secret.id, secret);
}

export async function deleteSecret(secret: Secret): Promise<Secret> {
  return httpDeleteWithAuth<Secret>('/api/secrets/' + secret.id);
}