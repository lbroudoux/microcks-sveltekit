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

import type { Service } from '../models/service.model';
import { getAuthenticatedUser } from '@/stores/auth.store';
import { AuthenticationService } from './auth.service.provider';

export async function getServices(page: number = 1, pageSize: number = 20): Promise<Service[] | Error> {

  const keycloak = (window as any).keycloak;
  //console.log("Service Keycloak: " + JSON.stringify(keycloak));
  console.log("Service Authenticated user: " + JSON.stringify(getAuthenticatedUser()));

  const options = `page=${page - 1}&pageSize=${pageSize}`;

  let headers: Headers = new Headers();
  AuthenticationService.instance.injectAuthHeaders(headers);
  console.log("Service Auth Headers: " + JSON.stringify(headers.get('Authorization')))

  const response = await fetch('/api/services?' + options, {
      method: 'GET',
      credentials: 'include',
      headers: headers,
      //{
        //'Authorization': 'Bearer ' + keycloak.token,
      //}
    });
  return response.json() as Promise<Service[]>;
}