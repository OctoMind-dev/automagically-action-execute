import {client} from '@octomind/octomind/client'

export type ExecuteResponse = ReturnType<
  typeof client.POST<'/apiKey/v3/execute'>
>

export type TestReport = ExecuteResponse['data']['testReport']

export type TestReportResponse = ReturnType<
  typeof client.GET<'/apiKey/v3/test-targets/{testTargetId}/test-reports/{testReportId}'>
>
