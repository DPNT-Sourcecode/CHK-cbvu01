export default class HelloSolution {
  hello(friendName) {
    if (friendName === undefined || typeof friendName !== "string") {
      throw new Error(
        "Please provide a valid parameter (Parameter must be a string!).",
      );
    }

    return `Hello, ${friendName}!`;
  }
}

