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
    };

    const multi = {
      A: [
        { qty: 5, price: 200 },
        { qty: 3, price: 130 },
      ],
      B: [{ qty: 2, price: 45 }],
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

    let total = 0;

    for (const sku in counts) {
      let count = counts[sku];

      if (multi[sku]) {
        for (const offer of multi[sku]) {
          const times = Math.floor(count / offer / qty);
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

