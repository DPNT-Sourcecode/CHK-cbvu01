export default class CheckoutSolution {
  // skus is expected to be a string
  checkout(skus) {
    if (typeof skus !== "string") return -1;

    const prices = {
      A: 50,
      B: 30,
      C: 20,
      D: 15,
    };

    const offers = {
      A: { qty: 3, price: 130 },
      B: { qty: 2, price: 45 },
    };

    const counts = {};

    for (const sku of skus) {
      if (!(sku in prices)) return -1;
      counts[sku] = (counts[sku] || 0) + 1;
    }

    let total = 0;

    for (const sku in counts) {
      const count = counts[sku];

      if (offers[sku]) {
        const { qty, price } = offers[sku];
        const offerCount = Math.floor(count / qty);
        const remainder = count % qty;

        total += offerCount * price;
        total += remainder * prices[sku];
      } else {
        total += count * prices[sku];
      }
    }

    return total;
  }
}
