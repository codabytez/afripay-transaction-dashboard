// Utility functions
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const exportToCSV = (transactions: Transaction[]) => {
  const headers = ["ID", "Description", "Amount", "Type", "Date"];
  const rows = transactions.map((t) => [
    t.id,
    t.description,
    t.amount.toString(),
    t.type,
    t.date,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportToExcel = (transactions: Transaction[]) => {
  const headers = ["ID", "Description", "Amount", "Type", "Date"];
  const rows = transactions.map((t) => [
    t.id,
    t.description,
    t.amount,
    t.type,
    t.date,
  ]);

  let content = "<table><thead><tr>";
  headers.forEach((h) => (content += `<th>${h}</th>`));
  content += "</tr></thead><tbody>";

  rows.forEach((row) => {
    content += "<tr>";
    row.forEach((cell) => (content += `<td>${cell}</td>`));
    content += "</tr>";
  });

  content += "</tbody></table>";

  const blob = new Blob([content], { type: "application/vnd.ms-excel" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split("T")[0]}.xls`;
  a.click();
  window.URL.revokeObjectURL(url);
};
