export default class CheckoutSolution {
  // skus is expected to be a string
  checkout(skus) {
    if (typeof skus !== "string") return -1;

    const prices = {
      A: 50,
      B: 30,
      C: 20,
      D: 15,
      E: 40,
      F: 10,
      G: 20,
      H: 10,
      I: 35,
      J: 60,
      K: 80,
      L: 90,
      M: 15,
      N: 40,
      O: 10,
      P: 50,
      Q: 30,
      R: 50,
      S: 30,
      T: 20,
      U: 40,
      V: 50,
      W: 20,
      X: 90,
      Y: 10,
      Z: 50,
    };

    const multi = {
      A: [
        { qty: 5, price: 200 },
        { qty: 3, price: 130 },
      ],
      B: [{ qty: 2, price: 45 }],
      H: [
        { qty: 10, price: 80 },
        { qty: 5, price: 45 },
      ],
      K: [{ qty: 2, price: 150 }],
      P: [{ qty: 5, price: 200 }],
      Q: [{ qty: 3, price: 80 }],
      V: [
        { qty: 3, price: 130 },
        { qty: 2, price: 90 },
      ],
    };

    const counts = {};

    for (const sku of skus) {
      if (!(sku in prices)) return -1;
      counts[sku] = (counts[sku] || 0) + 1;
    }

    const eCount = counts.E || 0;
    const freeB = Math.floor(eCount / 2);

    if (freeB > 0) {
      const bCount = counts.B || 0;
      counts.B = Math.max(0, bCount - freeB);
    }

    const fCount = counts.F || 0;
    const freeF = Math.floor(fCount / 3);

    if (freeF > 0) {
      counts.F = fCount - freeF;
    }

    let total = 0;

    for (const sku in counts) {
      let count = counts[sku];

      if (multi[sku]) {
        for (const offer of multi[sku]) {
          const times = Math.floor(count / offer.qty);
          if (times > 0) {
            total += times * offer.price;
            count -= times * offer.qty;
          }
        }
      }
      total += count * prices[sku];
    }
    return total;
  }
}

