import {ExecuteResponse, TestReport, TestReportResponse} from '../src/types'

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

export const createMockExecuteResponse = (
  overrides?: Partial<ExecuteResponse>
): ExecuteResponse => ({
  data: {
    testReportUrl: 'https://testReport.com',
    testReport: createMockTestReport(),
    ...overrides
  }
})

export const createMockTestReportResponse = (
  overrides?: Partial<TestReport>
): TestReportResponse => ({
  data: createMockTestReport(overrides)
})
