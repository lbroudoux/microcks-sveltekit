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

import { User } from '@/models/user.model';
import { derived, writable, get, type Readable, type Writable } from 'svelte/store';

export const authenticatedUser: Writable<User> = writable(new User());

export const authenticatedUserValue: Readable<User> = derived(authenticatedUser, ($authenticatedUser) => $authenticatedUser)

export function getAuthenticatedUser(): User {
  return get(authenticatedUser);
}