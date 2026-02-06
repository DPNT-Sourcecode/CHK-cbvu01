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
      K: 70,
      L: 90,
      M: 15,
      N: 40,
      O: 10,
      P: 50,
      Q: 30,
      R: 50,
      S: 20,
      T: 20,
      U: 40,
      V: 50,
      W: 20,
      X: 17,
      Y: 20,
      Z: 21,
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
      K: [{ qty: 2, price: 120 }],
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

    const applyFree = (targetSku, freeQty) => {
      if (freeQty <= 0) return;
      const cur = counts[targetSku] || 0;
      counts[targetSku] = Math.max(0, cur - freeQty);
    };

    // cross-item free offers
    applyFree("B", Math.floor((counts.E || 0) / 2));
    applyFree("M", Math.floor((counts.N || 0) / 3));
    applyFree("Q", Math.floor((counts.R || 0) / 3));

    // same-item free offers
    const f = counts.F || 0;
    if (f > 0) counts.F = f - Math.floor(f / 3);

    const u = counts.U || 0;
    if (u > 0) counts.U = u - Math.floor(u / 4); // ✅ fix

    let total = 0; // ✅ missing

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



