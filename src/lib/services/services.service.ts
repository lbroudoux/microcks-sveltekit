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

import { httpGetWithAuth } from "$lib/http-utils";
import type { Service } from "../models/service.model";
import { AuthenticationService } from "./auth.service.provider";

/**
 *
 * @param page
 * @param pageSize
 * @returns
 */
export async function getServices(
  page: number = 1,
  pageSize: number = 20
): Promise<Service[]> {
  // Set options string.
  const options = `page=${page - 1}&pageSize=${pageSize}`;

  // This API call requires authentication.
  let headers: Headers = new Headers();
  AuthenticationService.instance.injectAuthHeaders(headers);

  const response = await fetch("/api/services?" + options, {
    method: "GET",
    credentials: "include",
    headers: headers,
  });
  return response.json() as Promise<Service[]>;
}

/**
 *
 * @param serviceId
 */
export async function getService(serviceId: string): Promise<Service> {
  // This API call requires authentication.
  return httpGetWithAuth<Service>(
    "/api/services/" + serviceId + "?messages=false"
  );
}
