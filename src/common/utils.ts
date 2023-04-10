
export function calculateTotalPrice(items): { totalPrice: number, discountApplied: boolean, totalTax: number } {
  let totalPrice = 0;
  let discountApplied = false;
  let totalTax = 0;

  for (const item of items) {

    totalPrice += item.price * item.quantity;
    totalTax += item.quantity * item.taxRate;

    if (item.discountItemId) {
      const discountItem = items.find((i) => i._id.toString() === item.discountItemId);
      if (discountItem && !discountApplied) {
        totalPrice -= item.taxRate * item.quantity; // no tax
        discountApplied = true;
      }
    }

  }

  totalPrice += totalTax;
  totalPrice = Math.round(totalPrice * 100) / 100;

  return { totalPrice, discountApplied, totalTax };
}
