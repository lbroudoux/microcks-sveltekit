import { browser } from "$app/environment";
import type { LayoutLoad } from './$types';
import Keycloak from 'keycloak-js';
import { authenticatedUser } from "@/stores/auth.store";
import { get } from 'svelte/store';
import { User } from "@/models/user.model";

export const ssr = false;

export const load: LayoutLoad = async ({data}) => {
  console.log("In LayoutLoad(), in browser? " + browser);

  let config = {
    url: `http://localhost:8180`,
    realm: 'microcks',
    clientId: 'microcks-app-js'
  };

  let keycloak = new Keycloak(config);
  const loginOptions = { 
    onLoad: 'login-required', 
    checkLoginIframe: false,
  };

  try {
    console.log("Before keycloak.init()");
    
    const authenticated = await keycloak.init(loginOptions);

    // Fixes above warning.
    // const authenticated = await keycloak.init({ 
    //   onLoad: 'login-required', 
    //   checkLoginIframe: false,
    //   adapter: 'default'
    // });
    
    if (authenticated) {
      (window as any).keycloak = keycloak;
      console.log('User is authenticated');
      //console.log("Layout Keycloak: " + JSON.stringify(keycloak));
      //console.log("Layout Keycloak.tokenParsed: " + JSON.stringify(keycloak.tokenParsed));

      const user: User = new User();
      user.name = keycloak.tokenParsed?.name;
      user.login = keycloak.tokenParsed?.preferred_username;
      user.email = keycloak.tokenParsed?.email;
      authenticatedUser.set(user);
    } else {
      console.log('User is not authenticated');
    }
  } catch (error) {
    console.error('Failed to initialize adapter:', error);
  }

  console.log("Layout Authenticated user: " + JSON.stringify(get(authenticatedUser)));
};