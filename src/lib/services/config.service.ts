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

import type { User } from "@/models/user.model";

const ANONYMOUS_AUTH_TYPE = 'anonymous';

export class ConfigService {
  
  static _instance: ConfigService;

  private config: any;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() { }
 
  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): ConfigService {
    if (!ConfigService._instance) {
      ConfigService._instance = new ConfigService();
    }
    return ConfigService._instance;
  }

  public authType(): string | null {
    if (!this.config.auth) {
      return null;
    }
    return this.config.auth.type;
  }

  public authToken(): string | null{
    if (!this.config.auth) {
      return null;
    }
    return this.config.auth.token;
  }

  public authRefreshPeriod(): number | null {
    if (!this.config.auth) {
      return null;
    }
    return this.config.auth.tokenRefreshPeriod;
  }

  public authData(): any | null {
    if (!this.config.auth) {
      return null;
    }
    return this.config.auth.data;
  }

  public logoutUrl(): string | null {
    if (!this.config.auth) {
      return null;
    }
    return this.config.auth.logoutUrl;
  }

  public user(): User | null {
    return this.config.user as any;
  }

  public hasFeatureEnabled(feature: string): boolean {
    if (this.config.features) {
      const featureConfig = this.config.features[feature];
      return featureConfig.enabled === 'true';
    }
    return false;
  }

  public getFeatureProperty(feature: string, property: string): string | null {
    if (this.config.features) {
      const featureConfig = this.config.features[feature];
      return featureConfig[property];
    }
    return null;
  }
}