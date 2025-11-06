import { AnimatePresence, motion } from "framer-motion";
import { Download, Filter, Plus } from "lucide-react";
import { NextPage } from "next";
import { useRef, useEffect } from "react";

const ActionBar: NextPage<ActionBarProps> = ({
  filter,
  setFilter,
  showExportMenu,
  setShowExportMenu,
  handleExport,
  setIsModalOpen,
}) => {
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showExportMenu) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showExportMenu, setShowExportMenu]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-slate-200"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Filter:</span>
          <div className="flex gap-2">
            {(["all", "credit", "debit"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <AnimatePresence>
              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10"
                >
                  <button
                    onClick={() => handleExport("csv")}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport("excel")}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Export as Excel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionBar;
