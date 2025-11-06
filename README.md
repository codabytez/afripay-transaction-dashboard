# Transaction Dashboard - Afripay Assessment

A modern, responsive transaction management dashboard built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/codabytez/afripay-transaction-dashboard.git
cd afripay-transaction-dashboard
```

1. Install dependencies:

```bash
pnpm install
```

1. Run the development server:

```bash
pnpm run dev
```

1. Open your browser and navigate to:

```bash
http://localhost:3000
```

## 📦 Dependencies

- **Next.js** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 🏗️ Component Structure

```JavaScript
app/
├── page.tsx (Main TransactionDashboard component)
├── layout.tsx
└── globals.css

TransactionDashboard (Main Component)
├── Header Section
├── Summary Cards (3 statistics cards)
│   ├── Total Inflow Card
│   ├── Total Outflow Card
│   └── Net Balance Card
├── Actions Bar
│   ├── Filter Buttons (All/Credit/Debit)
│   ├── Export Dropdown (CSV/Excel)
│   └── Add Transaction Button
├── Transaction Table
│   └── Animated Transaction Rows
└── Add Transaction Modal
    └── Transaction Form
```

## Key Design Decisions

### 1. **Data Persistence with LocalStorage**

- Chose localStorage for client-side persistence without backend dependency
- Data survives page refreshes and browser sessions
- Initialized with sample transactions for better first-time UX

### 2. **State Management**

- Used React hooks (useState, useEffect, useMemo) for simplicity
- Memoized filtered transactions and summary calculations to optimize performance
- Separated form state from main transaction state for better organization

### 3. **TypeScript Implementation**

- Defined clear interfaces for Transaction and FilterType
- Ensured type safety throughout the application
- Better IDE support and error catching during development

### 4. **Styling Approach**

- Tailwind CSS for rapid development and consistency
- Custom gradient background for modern aesthetic
- Responsive design with mobile-first approach
- Color-coded transactions (green for credit, red for debit)

### 5. **Animation & UX**

- Framer Motion for smooth transitions and micro-interactions
- Staggered animations for list items
- Modal transitions for polished feel
- Hover states for better interactivity

### 6. **Export Functionality**

- Implemented both CSV and Excel export formats
- Exports respect current filter state
- Uses Blob API for client-side file generation
- Automatic filename with current date

### 7. **Component Organization**

- Single-file component for simplicity (suitable for assessment scope)
- Could be split into smaller components for larger applications
- Clear separation of concerns (utilities, types, main component)

## Features Implemented

### Core Requirements

- ✅ Display transaction list with all required fields
- ✅ Add new transactions via modal form
- ✅ Filter by type (All/Credit/Debit)
- ✅ Summary statistics (inflow, outflow, balance)
- ✅ LocalStorage persistence
- ✅ Export to CSV and Excel

### Additional Features

- Animated transitions for better UX
- Responsive design (desktop + mobile)
- Form validation
- Empty state handling
- Accessible UI components
- Modern, professional design

## Production Build

To create a production build:

```bash
npm run build
npm start
```

## Development Notes

- Code follows React best practices
- Functional components with hooks
- Clean, readable code structure
- Consistent formatting and naming conventions
- Comments where needed for clarity

---
