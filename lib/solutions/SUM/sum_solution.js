export default class SumSolution {
  compute(x, y) {
    if (x === undefined || y === undefined) {
      throw new Error("Both parameters must be provided");
    }

    const a = Number(x);
    const b = Number(y);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      throw new Error(
        `Invalid input: both parameters must be numeric. Recieved x=${x}, y=${y}`,
      );
    }

    return a + b;
  }
}
