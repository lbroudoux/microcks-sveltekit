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
import { error } from "@sveltejs/kit";

import { IAuthenticationService } from "$lib/services/auth.service";
import { ConfigService } from "$lib/services/config.service";
import { KeycloakAuthenticationService } from "$lib/services/auth-keycloak.service";
import { AnonymousAuthenticationService } from "$lib/services/auth-anonymous.service";

/**
 * A factory for retrieving the correct IAuthenticiationService implementation depending on the Configuration.
 */
export function AuthenticationServiceFactory(
  config: ConfigService
): IAuthenticationService {
  console.info(
    "[AuthenticationServiceFactory] Creating AuthenticationService..."
  );

  if (config.authType() === "keycloakjs") {
    console.info(
      "[AuthenticationServiceFactory] Creating keycloak.js auth service."
    );
    return new KeycloakAuthenticationService(config);
  } else if (config.authType() === "anonymous") {
    console.info(
      "[AuthenticationServiceFactory] Creating Anonymous auth service."
    );
    return new AnonymousAuthenticationService(config);
  }

  console.error(
    "[AuthenticationServiceFactory] Unsupported auth type: %s",
    config.authType()
  );
  throw error;
}

export class AuthenticationService {
  private static _instance: IAuthenticationService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): IAuthenticationService {
    return AuthenticationService._instance;
  }

  public static initializeAuthenticationService(config: ConfigService): void {
    AuthenticationService._instance = AuthenticationServiceFactory(config);
  }
}
