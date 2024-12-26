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
import type { Metadata } from "../models/commons.model";
import type { Api, GenericResource, Service, ServiceView, OperationMutableProperties } from "../models/service.model";
import { AuthenticationService } from "./auth.service.provider";

export async function getServices(
  page: number = 1,
  pageSize: number = 20
): Promise<Service[]> {
  // Set options string.
  const options = `page=${page - 1}&size=${pageSize}`;

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

export async function filterServices(
  labelsFilter: Map<string, string>,
  nameFilter: string
): Promise<Service[]> {

  let httpParams = new URLSearchParams();
  if (nameFilter != null) {
    httpParams.set('name', nameFilter);
  }
  if (labelsFilter != null) {
    for (const key of Array.from(labelsFilter.keys())) {
      httpParams.set('labels.' + key, labelsFilter.get(key) as string);
    }
  }

  // This API call requires authentication.
  return httpGetWithAuth<Service[]>(
    "/api/services/search?" + httpParams
  );
}

export async function countServices(): Promise<any> {
  return httpGetWithAuth<any>('/api/services/count');
}

export async function getServicesMap(): Promise<any> {
  return httpGetWithAuth<any>('/api/services/map');
}

export async function getServicesLabels(): Promise<any> {
  return httpGetWithAuth<any>('/api/services/labels');
}

export async function getServiceView(serviceId: string): Promise<ServiceView> {
  // Set messages to true.
  return httpGetWithAuth<ServiceView>(
    '/api/services/' + serviceId + '?messages=true'
  );
}

export async function getService(serviceId: string): Promise<Service> {
  // This API call requires authentication.
  return httpGetWithAuth<Service>(
    "/api/services/" + serviceId + "?messages=false"
  );
}

export async function createDirectResourceAPI(api: Api): Promise<Service> {
  return httpPostWithAuth<Service>('/api/services/generic', api);
}

export async function createDirectEventAPI(api: Api): Promise<Service> {
  return httpPostWithAuth<Service>('/api/services/generic/event', api);
}

export async function deleteService(service: Service): Promise<Service> {
  return httpDeleteWithAuth<Service>('/api/services/' + service.id);
}

export async function getGenericResources(
  service: Service,
  page: number = 1,
  pageSize: number = 20
): Promise<GenericResource[]> {
  // Set options string.
  const options = `page=${page - 1}&size=${pageSize}`;
  return httpGetWithAuth<GenericResource[]>(
    '/api/genericresources/service/' + service.id + '?' + options
  );
}

export async function updateServiceMetadata(
  service: Service, 
  metadata: Metadata
): Promise<any> {
  return httpPutWithAuth<any>(
    '/api/services/' + service.id + '/metadata', metadata
  );
}

export async function updateServiceOperationProperties(
  service: Service,
  operationName: string,
  properties: OperationMutableProperties
): Promise<any> {
  // Set options string.
  const options = `operationName=${operationName}`;
  return httpPutWithAuth<any>(
    '/api/services/' + service.id + '/operation?' + options,
    properties
  );
}

export async function countGenericResources(service: Service): Promise<any> {
  return httpGetWithAuth<any>(
    '/api/genericresources/service/' + service.id + '/count'
  );
}
