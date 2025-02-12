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
import { User } from "$lib/models/user.model";
import { ConfigService } from "$lib/services/config.service";
import { IAuthenticationService } from "$lib/services/auth.service";

/**
 * A version of the authentication service that uses keycloak.js to provide
 * authentication services.
 */
export class AnonymousAuthenticationService extends IAuthenticationService {
  private user: User;

  /**
   * Constructor.
   */
  constructor(private config: ConfigService) {
    super();
    this.user = new User();
    this.user.login = "admin";
    this.user.username = "Anonymous Admin";
    this.user.name = "Anonymous Admin";
    this.user.email = "anonymous.admin@microcks.io";
  }

  /**
   * A way for consumers to subscribe to the current authentication status of the user/app.
   */
  public isAuthenticated(): boolean {
    return true;
  }

  /**
   * Immediately gets the current authenticated user (if any).  Returns null if no user is
   * currently authenticated.
   */
  public getAuthenticatedUser(): User {
    return this.user;
  }

  /**
   * Not supported.
   */
  public login(user: string, credential: any): Promise<User> {
    throw new Error("Not supported.");
  }

  /**
   * Called to check that user can endorse a role.
   */
  public hasRole(role: string): boolean {
    return true;
  }

  /**
   * Called to check that user can endorse role for at least one resource.
   */
  public hasRoleForAnyResource(role: string): boolean {
    return true;
  }

  /**
   * Called to check that user can endorse role for a specific resource.
   */
  public hasRoleForResource(role: string, resource: string): boolean {
    return true;
  }

  /**
   * Logout.
   */
  public logout(): void {
    // Nothing to do here.
  }

  /**
   * Called to inject authentication headers into a remote API call.
   */
  public injectAuthHeaders(headers: Headers): void {
    // Nothing to do here.
  }

  /**
   * Called to return the keycloak access token.
   */
  public getAuthenticationSecret(): string {
    return "admin";
  }

  /**
   * Return the Keycloak realm name.
   */
  public getRealmName(): string {
    return "microcks";
  }

  /**
   * Return the Keycloak realm url.
   */
  public getRealmUrl(): string {
    throw new Error("Not supported.");
  }

  /**
   * Return the Keycloak administration realm url.
   */
  public getAdminRealmUrl(): string {
    throw new Error("Not supported.");
  }
}
