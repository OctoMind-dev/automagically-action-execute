# automagically-action-execute

This is a GitHub Action to execute automagically.
To use this action a token is required, which you can generate in our [octomind app](https://app.octomind.dev).

See the [docs](https://octomind.dev/docs) for more details.

> drop us a note: <contact@octomind.dev> 🐙

## Setup

1. Add the `AUTOMAGICALLY_TOKEN` to your repository secrets
2. Add the following yml snippet to your steps and insert a value for `url` pointing to a publicly accessible deployment of your branch.

```yml
- uses: OctoMind-dev/automagically-action-execute@v2
  with:
    url: <publicly accessible url to your deployment>
    token: ${{ secrets.AUTOMAGICALLY_TOKEN }}
    testTargetId: <your testTargetId that you also get from us>
    environmentName: <environment name> that your test cases should run against. optional, 
                     will use the "default" environment otherwise.
    blocking: <if the pipeline should wait for all test results to pass, optional, default is FALSE>
    variablesToOverwrite: <multiline string in the form of VARIABLE_NAME:value per line>
    tags: <if only a subset of your tests should be executed use this multiline string, with one tag per line>
```

## Change Log

- 2023-07-20: Added requirement for setting `testTargetId` to enable v2 API
- 2024-10-17: Added blocking parameter, if true we wait for all test results to be passed and fail the step other
- 2024-10-17: Added environment name parameter, if defined we will run the test cases against the specified environment,
  otherwise against the default environment.
- 2025-02-05: Added variablesToOverwrite parameter, we will use the provided variable values instead of the ones defined in the environment for this test run.
- 2025-02-19: Added tags parameter, we will only execute test cases that have at least one matching tag.
