// Types
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
}

type FilterType = "all" | "credit" | "debit";

interface FormProps {
  description: string;
  amount: string;
  type: "credit" | "debit";
  date: string;
}

interface AddTransactionProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTransaction: () => void;
  formData: FormProps;
  setFormData: React.Dispatch<React.SetStateAction<FormProps>>;
}

interface ActionBarProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  showExportMenu: boolean;
  setShowExportMenu: (show: boolean) => void;
  handleExport: (type: "csv" | "excel") => void;
  setIsModalOpen: (open: boolean) => void;
}
