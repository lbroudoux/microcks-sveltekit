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
import { httpGetWithAuth, httpPostWithAuth } from "$lib/http-utils";
import type { RequestResponsePair, UnidirectionalEvent } from '../models/service.model';
import type { TestRequest, TestResult } from "../models/test.model";

export async function listByServiceId(serviceId: string, page: number = 1, pageSize: number = 20): Promise<TestResult[]> {
  // Set options string.
  const options = `page=${page - 1}&size=${pageSize}`;
  return httpGetWithAuth<TestResult[]>('/api/tests/service/' + serviceId + '?' + options);
}

export async function countByServiceId(serviceId: string): Promise<any> {
  return httpGetWithAuth<any>('/api/tests/service/' + serviceId + '/count');
}

export async function getTestResult(resultId: string): Promise<TestResult> {
  return httpGetWithAuth<any>('/api/tests/' + resultId);
}

export async function create(testRequest: TestRequest): Promise<TestResult> {
  return httpPostWithAuth<TestResult>('/api/tests', testRequest);
}

export async function getMessages(test: TestResult, operation: string): Promise<RequestResponsePair> {
  // operation may contain / that are forbidden within encoded URI.
  // Replace them by "!" and implement same protocole on server-side.
  // Switched from _ to ! in replacement as less commonly used in URL parameters, in line with other frameworks e.g. Drupal
  operation = operation.replace(/\//g, '!');
  const testCaseId = test.id + '-' + test.testNumber + '-' + encodeURIComponent(operation);
  return httpGetWithAuth<RequestResponsePair>('/api/tests/' + test.id + '/messages/' + testCaseId);
}

export async function getEventMessages(test: TestResult, operation: string): Promise<UnidirectionalEvent> {
  // operation may contain / that are forbidden within encoded URI.
  // Replace them by "!" and implement same protocole on server-side.
  // Switched from _ to ! in replacement as less commonly used in URL parameters, in line with other frameworks e.g. Drupal
  operation = operation.replace(/\//g, '!');
  const testCaseId = test.id + '-' + test.testNumber + '-' + encodeURIComponent(operation);
  return httpGetWithAuth<UnidirectionalEvent>('/api/tests/' + test.id + '/events/' + testCaseId);
}