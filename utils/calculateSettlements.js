const Expense = require("../models/Expense");
const Settlement = require("../models/Settlement");

async function calculateAndSaveSettlements(linkId) {
  const expenses = await Expense.find({ linkId }).populate("payer sharedBy");

  if (!expenses || expenses.length === 0) {
    await Settlement.deleteMany({ linkId });
    return [];
  }

  const paidMap = {};
  const owedMap = {};

  for (const expense of expenses) {
    const { payer, price, sharedBy } = expense;
    const share = price / sharedBy.length;

    paidMap[payer._id] = (paidMap[payer._id] || 0) + price;

    for (const user of sharedBy) {
      owedMap[user._id] = (owedMap[user._id] || 0) + share;
    }
  }

  const netMap = {};
  const users = new Set([...Object.keys(paidMap), ...Object.keys(owedMap)]);
  users.forEach((userId) => {
    const paid = paidMap[userId] || 0;
    const owed = owedMap[userId] || 0;
    const net = paid - owed;
    if (net !== 0) netMap[userId] = net;
  });

  const creditors = [];
  const debtors = [];

  for (const [userId, net] of Object.entries(netMap)) {
    if (net > 0) creditors.push({ userId, amount: net });
    else debtors.push({ userId, amount: -net });
  }

  const settlements = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount,
      status: "pending",
      linkId,
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  await Settlement.deleteMany({ linkId });

  const createdSettlements = await Settlement.insertMany(settlements);
  return createdSettlements;
}

module.exports = { calculateAndSaveSettlements };
