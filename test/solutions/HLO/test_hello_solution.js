import { describe, it } from "node:test";
import assert from "node:assert";
import HelloSolution from "../../../lib/solutions/HLO/hello_solution.js";

describe("Hello World challenge: Return the correct greeting", function () {
  it("should return 'Hello there Vlad!'", function () {
    assert.strictEqual(new HelloSolution().hello("Vlad"), "Hello, World!");
  });

  it("should return error if parameter is not defined or string", function () {
    assert.throws(() => new HelloSolution().hello(), {
      name: "Error",
      message:
        "Please provide a valid parameter (Parameter must be a string!).",
    });
    assert.throws(() => {
      (new HelloSolution().hello(123),
        {
          name: "Error",
          message:
            "Please provide a valid parameter (Parameter must be a string!).",
        });
    });
  });
});
