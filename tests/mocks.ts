import {ExecuteResponse, TestReport, TestReportResponse} from '../src/types'
import {mock} from 'vitest-mock-extended'
import {Mock} from 'vitest'

export const createMockTestReport = (
  overrides?: Partial<TestReport>
): Exclude<TestReport, undefined> => ({
  id: 'someId',
  status: 'PASSED',
  testTargetId: 'id',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  executionUrl: 'https://execution.url',
  context: {
    source: 'manual'
  },
  breakpoint: 'DESKTOP',
  browser: 'CHROMIUM',
  testResults: [],
  ...overrides
})

export const createMockExecuteResponse = (overrides?: {
  testReport?: Partial<TestReport>
}): ExecuteResponse & {response: Mock; error: undefined} => ({
  response: mock(),
  error: undefined,
  data: {
    testReportUrl: 'https://testReport.com',
    testReport: createMockTestReport(overrides?.testReport)
  }
})

export const createMockTestReportResponse = (
  overrides?: Partial<TestReport>
): TestReportResponse => ({
  data: createMockTestReport(overrides)
})
