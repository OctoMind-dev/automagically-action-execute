import {ExecuteResponse, TestReport, TestReportResponse} from '../src/types'

export const createMockTestReport = (
  overrides?: Partial<TestReport>
): TestReport => ({
  id: 'someId',
  status: 'PASSED',
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
