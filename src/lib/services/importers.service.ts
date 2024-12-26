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
import type { ImportJob } from "../models/importer.model";

export async function getImportJobs(page: number = 1, pageSize: number = 20): Promise < ImportJob[] > {
  // Set options string.
  const options = `page=${page - 1}&size=${pageSize}`;

  return httpGetWithAuth<ImportJob[]>('/api/jobs?' + options);
}

export async function filterImportJobs(labelsFilter: Map<string, string>, nameFilter: string): Promise < ImportJob[] > {
  let httpParams = new URLSearchParams();
  if (nameFilter != null) {
    httpParams.set('name', nameFilter);
  }
  if (labelsFilter != null) {
    for (const key of Array.from(labelsFilter.keys())) {
      httpParams.set('labels.' + key, labelsFilter.get(key) as string);
    }
  }

  const options = { params: httpParams };
  return httpGetWithAuth<ImportJob[]>('/api/jobs/search?' + httpParams);
}

export async function countImportJobs(): Promise < any > {
  return httpGetWithAuth<any>('/api/jobs/count');
}

export async function createImportJob(job: ImportJob): Promise<ImportJob > {
  return httpPostWithAuth<ImportJob>('/api/jobs', job);
}

export async function updateImportJob(job: ImportJob): Promise<ImportJob> {
  return httpPostWithAuth<ImportJob>('/api/jobs/' + job.id, job);
}

export async function deleteImportJob(job: ImportJob): Promise<ImportJob> {
  return httpDeleteWithAuth<ImportJob>('/api/jobs/' + job.id);
}

export async function activateImportJob(job: ImportJob): Promise<ImportJob> {
  return httpPutWithAuth<ImportJob>('/api/jobs/' + job.id + '/activate', job);
}

export async function startImportJob(job: ImportJob): Promise<ImportJob> {
  return httpPutWithAuth<ImportJob>('/api/jobs/' + job.id + '/start', job);
}

export async function stopImportJob(job: ImportJob): Promise<ImportJob> {
  return httpPutWithAuth<ImportJob>('/api/jobs/' + job.id + '/stop', job);
}