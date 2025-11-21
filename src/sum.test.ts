import { expect, test } from "vitest";
import sum from "./sum";

test("adds 1 + 2 and gets 3", () => {
    expect(sum(1,2 )).toBe(3);
})