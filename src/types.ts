export type TestReportStatus = 'PASSED' | 'WAITING' | 'FAILED'

export interface TestReport {
  id: string
  testTargetId: string
  createdAt: string
  updatedAt: string
  executionUrl: string
  context: {
    ref?: string
    sha?: string
    repo: string
    owner: string
    source: string
    issueNumber?: number
  }
  status: TestReportStatus
}

export interface ExecuteResponse {
  testReportUrl: string
  testReport: TestReport
}
