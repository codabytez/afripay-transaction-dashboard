"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { transactionData } from "./data";
import { exportToCSV, exportToExcel } from "@/utils";
import SummaryCards from "./summary-cards";
import ActionBar from "./action-bar";
import TransactionList from "./transaction-list";
import AddTransaction from "./add-transaction";
import { NextPage } from "next";

const TransactionDashboard: NextPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        return JSON.parse(stored) as Transaction[];
      }
    } catch (e) {
      throw e;
    }
    localStorage.setItem("transactions", JSON.stringify(transactionData));
    return transactionData;
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "credit" as "credit" | "debit",
    date: new Date().toISOString().split("T")[0],
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  // Summary calculations
  const summary = useMemo(() => {
    const inflow = transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0);

    const outflow = transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      inflow,
      outflow,
      balance: inflow - outflow,
    };
  }, [transactions]);

  const handleAddTransaction = () => {
    if (!formData.description || !formData.amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({
      description: "",
      amount: "",
      type: "credit",
      date: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(false);
  };

  const handleExport = (format: "csv" | "excel") => {
    if (format === "csv") {
      exportToCSV(filteredTransactions);
    } else {
      exportToExcel(filteredTransactions);
    }
    setShowExportMenu(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-slate-600">
            Manage and track your financial transactions
          </p>
        </motion.div>

        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Actions Bar */}
        <ActionBar
          filter={filter}
          setFilter={setFilter}
          showExportMenu={showExportMenu}
          setShowExportMenu={setShowExportMenu}
          handleExport={handleExport}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Transactions List */}
        <TransactionList filteredTransactions={filteredTransactions} />

        {/* Add Transaction Modal */}
        <AddTransaction
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleAddTransaction={handleAddTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionDashboard;
