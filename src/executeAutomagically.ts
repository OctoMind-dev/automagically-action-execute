import { join } from "node:path";
// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as core from "@actions/core";
// this import MUST be a namespace import, otherwise ncc doesn't think it needs to bundle this :)
// eslint-disable-next-line import/no-namespace
import * as github from "@actions/github";
import { createClientFromUrlAndApiKey } from "@octomind/octomind/client";
import { executeTests } from "./executeTests";
import { exploreTestPlan } from "./exploreTestPlan";
import {
  type ActionType,
  DEFAULT_URL,
  MAXIMUM_POLL_TIME_MILLISECONDS,
  multilineMappingToObject,
  TIME_BETWEEN_POLLS_MILLISECONDS,
} from "./utils";

export const executeAutomagically = async ({
  pollingIntervalInMilliseconds = TIME_BETWEEN_POLLS_MILLISECONDS,
  maximumPollingTimeInMilliseconds = MAXIMUM_POLL_TIME_MILLISECONDS,
}: {
  pollingIntervalInMilliseconds?: number;
  maximumPollingTimeInMilliseconds?: number;
} = {}): Promise<void> => {
  const urlOverride = core.getInput("automagicallyBaseUrl");
  const automagicallyUrl = urlOverride.length === 0 ? DEFAULT_URL : urlOverride;

  const issueNumber = github.context.issue.number;
  if (!issueNumber || issueNumber < 1) {
    core.warning(
      "issue.number variable (Pull Request ID) not available. " +
        "Make sure you run this action in a workflow triggered by pull request " +
        "if you expect a comment with the test results on your PR",
    );
  }

  // For PRs the SHA and ref is NOT of the actual triggering commit, it is the merge commit of a merge of this branch onto main.
  // to ensure that we get the actual triggering commit we need to use the pull request data
  // cf. https://github.com/orgs/community/discussions/26325 + https://github.com/orgs/community/discussions/59677
  const sha = github.context.payload.pull_request?.head?.sha ?? github.context.sha;
  const ref = github.context.payload.pull_request?.head?.ref ?? github.context.ref;

  // common parameters
  const context = {
    issueNumber,
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    ref,
    sha,
  };

  core.debug(JSON.stringify({ context }, null, 2));

  const token = core.getInput("token");
  if (token.length === 0) {
    core.setFailed("token is set to an empty string");
    throw new Error("token is set to an empty string");
  }

  const url = core.getInput("url");
  if (url.length === 0) {
    core.setFailed("url is set to an empty string");
    throw new Error("url is set to an empty string");
  }
  const environmentName = core.getInput("environmentName");
  const testTargetId = core.getInput("testTargetId");
  if (testTargetId.length === 0) {
    core.setFailed("testTargetId is set to an empty string");
    throw new Error("testTargetId is set to an empty string");
  }

  const actionInput = core.getInput("action");
  let action: ActionType = "execute-tests";
  if (actionInput.length > 0) {
    if (actionInput === "execute-tests" || actionInput === "explore-test-plan") {
      action = actionInput;
    } else {
      core.warning(`Unknown action "${actionInput}", defaulting to "execute-tests"`);
    }
  }

  const urlWithApiPostfix = new URL(automagicallyUrl);
  urlWithApiPostfix.pathname = `${urlWithApiPostfix.pathname.replace(/\/$/, "")}/api`;

  const client = createClientFromUrlAndApiKey({
    baseUrl: urlWithApiPostfix.href,
    apiKey: token,
  });

  try {
    if (action === "explore-test-plan") {
      await exploreTestPlan({
        client,
        testTargetId,
        url,
        environmentName,
        context,
      });
    } else {
      const blocking = core.getBooleanInput("blocking");
      const browser = core.getInput("browser");
      const breakpoint = core.getInput("breakpoint");
      const variablesToOverwrite = core.getMultilineInput("variablesToOverwrite");
      const variablesToOverwriteObject = multilineMappingToObject(variablesToOverwrite);
      const tags = core.getMultilineInput("tags");
      const ymlSourceDirectory = core.getInput("ymlDirectory");
      const ymlDirectoryWithFallback =
        ymlSourceDirectory.length > 0 ? ymlSourceDirectory : join(process.cwd(), ".octomind");

      await executeTests({
        client,
        testTargetId,
        url,
        environmentName,
        browser,
        breakpoint,
        variablesToOverwriteObject,
        tags,
        ymlDirectoryWithFallback,
        context,
        blocking,
        pollingIntervalInMilliseconds,
        maximumPollingTimeInMilliseconds,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(
        `unable to execute automagically:  ${
          typeof error.message === "object"
            ? JSON.stringify({
                error: error.message,
              })
            : error.message
        }`,
      );
    } else {
      core.setFailed("unknown Error");
    }
  }
};
