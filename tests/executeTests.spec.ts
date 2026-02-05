import core from "@actions/core";
import { createClientFromUrlAndApiKey } from "@octomind/octomind/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { type DeepMockProxy, mock, mockDeep } from "vitest-mock-extended";
import { executeTests } from "../src/executeTests";
import { pushIfYmlsExist } from "../src/pushIfYmlsExist";
import type { GitHubContext } from "../src/utils";
import { createMockExecuteResponse, createMockTestReportResponse } from "./mocks";

vi.mock("@octomind/octomind/client");
vi.mock("@actions/core");
vi.mock("../src/pushIfYmlsExist");

describe(executeTests.name, () => {
  let mockedClient: DeepMockProxy<ReturnType<typeof createClientFromUrlAndApiKey>>;
  let mockContext: GitHubContext;

  beforeEach(() => {
    vi.mocked(core.summary.addHeading).mockReturnThis();
    vi.mocked(core.summary.addLink).mockReturnThis();
    vi.mocked(core.summary.write).mockResolvedValue(core.summary);

    mockedClient = mockDeep();
    vi.mocked(createClientFromUrlAndApiKey).mockReturnValue(mockedClient);
    vi.mocked(mockedClient.POST).mockResolvedValue(createMockExecuteResponse() as never);
    vi.mocked(mockedClient.GET).mockResolvedValue(mock());
    vi.mocked(pushIfYmlsExist).mockResolvedValue(undefined);

    mockContext = {
      issueNumber: 10,
      repo: "some repo",
      owner: "some owner",
      ref: "refs/heads/main",
      sha: "abc123",
    };
  });

  it("executes tests with correct parameters", async () => {
    const params = {
      client: mockedClient,
      testTargetId: "test-target-id",
      url: "https://example.com",
      environmentName: "staging",
      browser: "CHROMIUM",
      breakpoint: "DESKTOP",
      variablesToOverwriteObject: { key1: ["value1"] },
      tags: ["tag1"],
      ymlDirectoryWithFallback: "/path/to/ymls",
      context: mockContext,
      blocking: false,
    };

    await executeTests(params);

    expect(mockedClient.POST).toHaveBeenCalledWith("/apiKey/v3/execute", {
      body: expect.objectContaining({
        url: params.url,
        testTargetId: params.testTargetId,
        environmentName: params.environmentName,
        browser: params.browser,
        breakpoint: params.breakpoint,
        variablesToOverwrite: params.variablesToOverwriteObject,
        tags: params.tags,
        context: {
          source: "github",
          ...mockContext,
        },
      }),
    });
  });

  it("pushes yml files before execution", async () => {
    const params = {
      client: mockedClient,
      testTargetId: "test-target-id",
      url: "https://example.com",
      environmentName: "default",
      browser: "CHROMIUM",
      breakpoint: "DESKTOP",
      variablesToOverwriteObject: {},
      tags: [],
      ymlDirectoryWithFallback: "/path/to/ymls",
      context: mockContext,
      blocking: false,
    };

    await executeTests(params);

    expect(pushIfYmlsExist).toHaveBeenCalledWith({
      client: mockedClient,
      testTargetId: params.testTargetId,
      sourceDir: params.ymlDirectoryWithFallback,
    });
  });

  it("sets output with test report URL", async () => {
    await executeTests({
      client: mockedClient,
      testTargetId: "test-target-id",
      url: "https://example.com",
      environmentName: "default",
      browser: "CHROMIUM",
      breakpoint: "DESKTOP",
      variablesToOverwriteObject: {},
      tags: [],
      ymlDirectoryWithFallback: "/path",
      context: mockContext,
      blocking: false,
    });

    expect(core.setOutput).toHaveBeenCalledWith("testReportUrl", "https://testReport.com");
  });

  it("polls when blocking is true and waits for PASSED status", async () => {
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({ testReport: { status: "WAITING" } }) as never,
    );
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(createMockTestReportResponse({ status: "WAITING" }) as never);
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(createMockTestReportResponse({ status: "PASSED" }) as never);

    await executeTests({
      client: mockedClient,
      testTargetId: "test-target-id",
      url: "https://example.com",
      environmentName: "default",
      browser: "CHROMIUM",
      breakpoint: "DESKTOP",
      variablesToOverwriteObject: {},
      tags: [],
      ymlDirectoryWithFallback: "/path",
      context: mockContext,
      blocking: true,
      pollingIntervalInMilliseconds: 1,
    });

    expect(mockedClient.GET).toHaveBeenCalledTimes(2);
    expect(core.setFailed).not.toHaveBeenCalled();
  });

  it("sets failed when blocking and status is FAILED", async () => {
    vi.mocked(mockedClient.POST).mockResolvedValueOnce(
      createMockExecuteResponse({ testReport: { status: "WAITING" } }) as never,
    );
    vi.mocked(mockedClient.GET).mockResolvedValueOnce(createMockTestReportResponse({ status: "FAILED" }) as never);

    await executeTests({
      client: mockedClient,
      testTargetId: "test-target-id",
      url: "https://example.com",
      environmentName: "default",
      browser: "CHROMIUM",
      breakpoint: "DESKTOP",
      variablesToOverwriteObject: {},
      tags: [],
      ymlDirectoryWithFallback: "/path",
      context: mockContext,
      blocking: true,
      pollingIntervalInMilliseconds: 1,
    });

    expect(core.setFailed).toHaveBeenCalled();
  });

  it("throws error when execute response has no data", async () => {
    vi.mocked(mockedClient.POST).mockResolvedValueOnce({
      data: undefined,
    } as never);

    await expect(
      executeTests({
        client: mockedClient,
        testTargetId: "test-target-id",
        url: "https://example.com",
        environmentName: "default",
        browser: "CHROMIUM",
        breakpoint: "DESKTOP",
        variablesToOverwriteObject: {},
        tags: [],
        ymlDirectoryWithFallback: "/path",
        context: mockContext,
        blocking: false,
      }),
    ).rejects.toThrow("execute did not return any data");
  });
});
