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

import { get } from 'svelte/store';
import { browser } from "$app/environment";
import type { LayoutLoad } from './$types';
import Keycloak from 'keycloak-js';

import { authenticatedUser } from "@/stores/auth.store";
import { ConfigService } from '@/services/config.service';
import { AuthenticationService} from '@/services/auth.service.provider';

export const ssr = false;

let keycloakConfig: any;

/**
 * Load application wichi means: get Keycloak config and launch the OIDC
 * login flow is enabeld. Then - on login flow success or if no authentication required -
 * load the application services (ConfigService & AuthenticationService).
 */
export const load: LayoutLoad = async ({data}) => {
  // Load Keycloak config from server. Need to do this before invoking
  // keycloak-js constructor to first check the enabled flag.
  console.log('[Microcks launch] Origin: ' + location.origin + ', in browser mode? ' + browser);

  // Actually call the getKeycloakConfig function and process with startup.
  keycloakConfig = await getKeycloakConfig();
    
  if (keycloakConfig && keycloakConfig.enabled) {
    console.log('[Microcks launch] Keycloak is enabled, launching OIDC login flow...');
  
    // Build keycloak-js adapter from config.
    let keycloak = new Keycloak({
      url: keycloakConfig['auth-server-url'],
      realm: keycloakConfig.realm,
      clientId: keycloakConfig.resource
    });

    const loginOptions = { 
      onLoad: 'login-required', 
      checkLoginIframe: true,
    };

    if (location.origin.indexOf('/localhost:') != -1) {
      console.log('[Microcks launch] Running locally so disabling Keycloak checkLogin Iframe to respect modern browser restrictions');
      loginOptions.checkLoginIframe = false;
    }

    try {
      // Actually authenticate by initializing the login flow.
      const authenticated = await keycloak.init({ 
        onLoad: 'login-required', 
        checkLoginIframe: false,
        adapter: 'default'
      });
      
      if (authenticated) {
        (window as any).keycloak = keycloak;
        await loadApplicationServices();
      } else {
        console.error('[Microcks launch] User is not authenticated');
      }
    } catch (error) {
      console.error('[Microcks launch] Error while initializing Keycloak');
      alert('Failed to initialize authentication subsystem.');
    }
  } else {
    console.log('[Microcks launch] Keycloak is disabled so running in dev mode with anonymous authent');
    await loadApplicationServices();
  }

  console.log("Layout Authenticated user: " + JSON.stringify(get(authenticatedUser)));

};

async function getKeycloakConfig(): Promise<any> {
  const response = await fetch('/api/keycloak/config', { method: 'GET' });
  return response.json() as Promise<any>;
}

async function loadApplicationServices(): Promise<any> {
  // Load additional application configuration.
  const configService = ConfigService.instance;
  await configService.loadConfiguredFeatures();

  AuthenticationService.initializeAuthenticationService(configService);
}