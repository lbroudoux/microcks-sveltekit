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

import { IAuthenticationService } from './auth.service';
import { KeycloakAuthenticationService } from './auth-keycloak.service';
import { User } from '../models/user.model';

export class UsersService {

  private rootUrl = '/api';

  private microcksAppClientId!: string | null;

  constructor(protected authService: IAuthenticationService) {
    if (authService instanceof KeycloakAuthenticationService) {
      this.rootUrl = (authService as KeycloakAuthenticationService).getAdminRealmUrl();
      this.loadClientId();
    }
  }

  private loadClientId(): void {
    httpGetWithAuth<any[]>(this.rootUrl + '/clients?clientId=microcks-app&max=2&search=true')
      .then((res: any) => {
        const client = res.find(c => c.clientId === 'microcks-app');
        if (client) {
          this.microcksAppClientId = client.id;
        }
      })
      .catch((err: any) => {
        console.warn('Unable to retrieve microcksAppClientId from Keycloak. Maybe you do not have correct roles?');
        this.microcksAppClientId = null;
      });
  }

  getRealmName(): string | null {
    if (this.authService instanceof KeycloakAuthenticationService) {
      return (this.authService as KeycloakAuthenticationService).getRealmName();
    }
    return null;
  }

  async getGroups(): Promise<any[]> {
    // 'search' for Pre-Keycloak-X, 'q' for 'Keycloak-X'
    const options = 'search=microcks&q=microcks&populateHierarchy=false';
    return httpGetWithAuth<any[]>(this.rootUrl + '/groups?' + options);
  }
  async createGroup(parentGroupId: string, name: string): Promise<any> {
    const group = {name};
    return httpPostWithAuth<any[]>(this.rootUrl + '/groups/' + parentGroupId + '/children', group);
  }

  async getUsers(page: number = 1, pageSize: number = 20): Promise<User[]> {
    let first = 0;
    if (page > 1) {
      first += pageSize * (page - 1);
    }
    const options = `first=${String(first)}&max=${String(pageSize)}`;
    return httpGetWithAuth<User[]>(this.rootUrl + '/users?' + options);
  }

  getMicrocksAppClientId(): string {
    return this.microcksAppClientId;
  }

  async filterUsers(filter: string): Promise<User[]> {
    const options = `search=${filter}`;
    return httpGetWithAuth<User[]>(this.rootUrl + '/users?' + options);
  }

  async countUsers(): Promise<any> {
    return httpGetWithAuth<User[]>(this.rootUrl + '/users/count');
  }

  async getUserRealmRoles(userId: string): Promise<any[]> {
    return httpGetWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/role-mappings/realm');
  }
  async getUserRoles(userId: string): Promise<any[]> {
    return httpGetWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/role-mappings/clients/' + this.microcksAppClientId);
  }
  async getUserGroups(userId: string): Promise<any[]> {
    return httpGetWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/groups');
  }

  async assignRoleToUser(userId: string, roleName: string): Promise<any> {
    this.getRoleByName(roleName).then((role: any) => {
      return httpPostWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/role-mappings/clients/' + this.microcksAppClientId, [ role ]);
    });
  }
  async removeRoleFromUser(userId: string, roleName: string): Promise<any> {
    this.getRoleByName(roleName).then((role: any) => {
      return httpDeleteWithAuth(this.rootUrl + '/users/' + userId + '/role-mappings/clients/' + this.microcksAppClientId, [ role ]);
    });
  }

  async putUserInGroup(userId: string, groupId: string): Promise<any> {
    const data = {realm: this.getRealmName(), userId, groupId};
    return httpPutWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/groups/' + groupId, data);
  }
  async removeUserFromGroup(userId: string, groupId: string): Promise<any> {
    return httpDeleteWithAuth<any[]>(this.rootUrl + '/users/' + userId + '/groups/' + groupId);
  }

  private async getRoleByName(role: string): Promise<any> {
    return httpGetWithAuth<any[]>(this.rootUrl + '/clients/' + this.microcksAppClientId + '/roles/' + role);
  }
}