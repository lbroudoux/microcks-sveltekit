import { get } from 'svelte/store';
import { browser } from "$app/environment";
import type { LayoutLoad } from './$types';
import Keycloak from 'keycloak-js';

import { User } from "@/models/user.model";
import { authenticatedUser } from "@/stores/auth.store";
import { ConfigService } from '@/services/config.service';
import { IAuthenticationService } from '@/services/auth.service';
import { AuthenticationService} from '@/services/auth.service.provider';


export const ssr = false;

let keycloakConfig: any;

async function getKeycloakConfig(): Promise<any> {
  const response = await fetch('/api/keycloak/config', { method: 'GET' });
  return response.json() as Promise<any>;
}

export const load: LayoutLoad = async ({data}) => {
  console.log("In LayoutLoad(), in browser? " + browser);

  // Load Keycloak config from server. Need to do this before invoking
  // keycloak-js constructor to first check the enabled flag.
  console.log('[Microcks launch] Origin: ' + location.origin);

  // Actually call the getKeycloakConfig function and process with startup.
  keycloakConfig = await getKeycloakConfig();
    
  if (keycloakConfig && keycloakConfig.enabled) {
    console.log('[Microcks launch] Keycloak is enabled, launching OIDC login flow...');
  }

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
    console.log("Before keycloak.init()");
    
    // Actually authenticate by initializing the login flow.
    const authenticated = await keycloak.init({ 
      onLoad: 'login-required', 
      checkLoginIframe: false,
      adapter: 'default'
    });
    
    if (authenticated) {
      (window as any).keycloak = keycloak;
      
      // Update user in authenticatedUser store.
      const user: User = new User();
      user.name = keycloak.tokenParsed?.name;
      user.login = keycloak.tokenParsed?.preferred_username;
      user.email = keycloak.tokenParsed?.email;
      authenticatedUser.set(user);
    } else {
      console.error('[Microcks launch] User is not authenticated');
    }
  } catch (error) {
    console.error('[Microcks launch] Error while initializing Keycloak');
    alert('Failed to initialize authentication subsystem.');
  }

  console.log("Layout Authenticated user: " + JSON.stringify(get(authenticatedUser)));

  // Load additional application configuration.
  // const configService = ConfigService.instance;
  // configService.loadConfiguredFeatures();

  await loadApplicationServices();
};

async function loadApplicationServices(): Promise<any> {
  // Load additional application configuration.
  const configService = ConfigService.instance;
  await configService.loadConfiguredFeatures();

  AuthenticationService.initializeAuthenticationService(configService);
}