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

import { AuthenticationService } from "./services/auth.service.provider";

export async function httpGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: "GET",
  });
  return response.json() as Promise<T>;
}

export async function httpGetWithAuth<T>(endpoint: string): Promise<T> {
  return fetchWithAuth(endpoint, "GET");
}

export async function httpPostWithAuth<T>(endpoint: string, body: any): Promise<T> {
  return fetchWithAuth(endpoint, "POST", body);
}

export async function httpPutWithAuth<T>(endpoint: string, body: any): Promise<T> {
  return fetchWithAuth(endpoint, "PUT", body);
}

export async function httpDeleteWithAuth<T>(endpoint: string, body?: any): Promise<T> {
  return fetchWithAuth(endpoint, "DELETE", body);
}

async function fetchWithAuth<T>(endpoint: string, method: string, body?: any): Promise<T> {
  // This API call requires authentication.
  let headers: Headers = new Headers();
  AuthenticationService.instance.injectAuthHeaders(headers);

  const requestInit: RequestInit = {
    method: method,
    headers: headers,
  } 
  if (body != null && body != undefined) {
    requestInit.body = body;
  }

  const response = await fetch(endpoint, requestInit);
  return response.json() as Promise<T>;
}