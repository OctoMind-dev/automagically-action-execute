import { setTimeout } from "node:timers";

export const TIME_BETWEEN_POLLS_MILLISECONDS = 5_000;
export const MAXIMUM_POLL_TIME_MILLISECONDS = 2 * 60 * 60 * 1000;
export const DEFAULT_URL = "https://app.octomind.dev";

export const sleep = (timeInMilliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));

export const multilineMappingToObject = (input: string[]): Record<string, string[]> => {
  const keySplitOff = input
    .filter((mapping) => mapping.length > 0)
    .map((mapping) => mapping.split(":"))
    .map((parts) => [parts[0], [parts.slice(1).join(":")]]);
  return Object.fromEntries(keySplitOff);
};

export type ActionType = "execute-tests" | "explore-test-plan";

export type GitHubContext = {
  issueNumber: number;
  repo: string;
  owner: string;
  ref: string;
  sha: string;
};
