import { describe, it } from "node:test";
import assert from "node:assert";
import HelloSolution from "../../../lib/solutions/HLO/hello_solution.js"

describe("Hello World challenge: Return the correct greeting", function () {
  it("should return 'Hello there Vlad!'", function () {
    assert.strictEqual(new HelloSolution().hello("Vlad"), "Hello there Vlad!")
  });
});
