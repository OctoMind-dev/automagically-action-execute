import { describe, expect, it } from "vitest";
import { multilineMappingToObject } from "../src/utils";

describe(multilineMappingToObject.name, () => {
  it("returns empty object for empty input", () => {
    expect(multilineMappingToObject([])).toEqual({});
  });

  it("filters out empty strings (but does not trim whitespace-only lines)", () => {
    expect(multilineMappingToObject(["", "   ", "key:value"])).toEqual({
      "   ": [""],
      key: ["value"],
    });
  });

  it("maps key:value to { key: [value] }", () => {
    expect(multilineMappingToObject(["key1:value1"])).toEqual({
      key1: ["value1"],
    });
  });

  it("preserves colons in values", () => {
    expect(multilineMappingToObject(["key2:value:2"])).toEqual({
      key2: ["value:2"],
    });
  });

  it("keeps last entry when keys repeat", () => {
    expect(multilineMappingToObject(["key:value1", "key:value2"])).toEqual({
      key: ["value2"],
    });
  });
});
