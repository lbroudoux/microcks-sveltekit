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
import { httpGetWithAuth } from "$lib/http-utils";

import type { DailyInvocations, TestConformanceMetric, TestResultSummary, WeightedMetricValue } from '../models/metric.model';

export async function getInvocationStats(day: Date): Promise<DailyInvocations> {
  if (day != null) {
    const options = `day=${formatDayDate(day)}`;
    return httpGetWithAuth<DailyInvocations>('/api/metrics/invocations/global?' + options);
  }
  return httpGetWithAuth<DailyInvocations>('/api/metrics/invocations/global');
}

export async function getTopInvocations(day: Date): Promise<DailyInvocations[]> {
  if (day != null) {
    const options = `day=${formatDayDate(day)}`;
    return httpGetWithAuth<DailyInvocations[]>('/api/metrics/invocations/top?' + options);
  }
  return httpGetWithAuth<DailyInvocations[]>('/api/metrics/invocations/top');
}

export async function getServiceInvocationStats(serviceName: string, serviceVersion: string, day: Date): Promise<DailyInvocations> {
  if (day != null) {
    const options = `day=${formatDayDate(day)}`;
    return httpGetWithAuth<DailyInvocations>('/api/metrics/invocations/' + serviceName + '/' + serviceVersion + '?' + options);
  }
  return httpGetWithAuth<DailyInvocations>('/api/metrics/invocations/' + serviceName + '/' + serviceVersion);
}

export async function getInvocationsStatsTrend(limit: number): Promise<any> {
  if (limit != null) {
    const options = `limit=${limit.toString()}`;
    return httpGetWithAuth<any>('/api/metrics/invocations/global/latest?' + options);
  }
  return httpGetWithAuth<any>('/api/metrics/invocations/global/latest');
}

export async function getServiceTestConformanceMetric(serviceId: string): Promise<TestConformanceMetric> {
  return httpGetWithAuth<TestConformanceMetric>('/api/metrics/conformance/service/' + serviceId);
}

export async function getAggregatedTestConformanceMetrics(): Promise<WeightedMetricValue[]> {
  return httpGetWithAuth<WeightedMetricValue[]>('/api/metrics/conformance/aggregate');
}

export async function getLatestTestsTrend(limit: number): Promise<TestResultSummary[]> {
  if (limit != null) {
    const options = `limit=${limit.toString()}`;
    return httpGetWithAuth<TestResultSummary[]>('/api/metrics/tests/latest?' + options);
  }
  return httpGetWithAuth<TestResultSummary[]>('/api/metrics/tests/latest');
}

function formatDayDate(day: Date): string {
  let result = day.getFullYear().toString();
  result += day.getMonth() < 9 ? '0' + (day.getMonth() + 1).toString() : (day.getMonth() + 1).toString();
  result += day.getDate() < 10 ? '0' + day.getDate().toString() : day.getDate().toString();
  return result;
}