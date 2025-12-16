import {paths} from '@octomind/octomind/client'

export type ExecuteResponse = {
  data: paths['/apiKey/v3/execute']['post']['responses']['200']['content']['application/json']
}

export type TestReport = Exclude<
  ExecuteResponse['data']['testReport'],
  undefined
>

export type TestReportResponse = {
  data: paths['/apiKey/v3/test-targets/{testTargetId}/test-reports/{testReportId}']['get']['responses']['200']['content']['application/json']
}
