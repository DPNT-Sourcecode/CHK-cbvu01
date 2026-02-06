export default class CheckoutSolution {
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

    applyFree("B", Math.floor((counts.E || 0) / 2));
    applyFree("M", Math.floor((counts.N || 0) / 3));
    applyFree("Q", Math.floor((counts.R || 0) / 3));

    const f = counts.F || 0;
    if (f > 0) counts.F = f - Math.floor(f / 3);

    const u = counts.U || 0;
    if (u > 0) counts.U = u - Math.floor(u / 4);

    const groupSkus = ["S", "T", "X", "Y", "Z"];
    const groupItems = [];

    for (const sku of groupSkus) {
      const c = counts[sku] || 0;
      for (let i = 0; i < c; i++) groupItems.push(prices[sku]);
    }

    groupItems.sort((a, b) => b - a);

    const groups = Math.floor(groupItems.length / 3);
    let total = groups * 45;

    for (let i = groups * 3; i < groupItems.length; i++) {
      total += groupItems[i];
    }

    let toConsume = groups * 3;
    if (toConsume > 0) {
      const skusByPriceDesc = [...groupSkus].sort(
        (a, b) => prices[b] - prices[a],
      );

      for (const sku of skusByPriceDesc) {
        if (toConsume <= 0) break;
        const c = counts[sku] || 0;
        const take = Math.min(c, toConsume);
        counts[sku] = c - take;
        toConsume -= take;
      }
    }

    for (const sku in counts) {
      let count = counts[sku];
      if (count <= 0) continue;

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




