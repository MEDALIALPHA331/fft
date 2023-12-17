import { Loan, Product } from "./types";

export function filterArray(loan: Loan, products: Product[]): Product {
  switch (loan) {
    case "Automobile Loan": {
      return products.filter((p) => p.name == "Automobile Loan")[0];
    }
    case "Cash Loan": {
      return products.filter((p) => p.name == "Cash Loan")[0];
    }
    case "Housing Loan": {
      return products.filter((p) => p.name == "Housing Loan")[0];
    }
  }
}

export function calculateTotalAmount(
  loanAmount: number,
  interest: number,
): number {
  return loanAmount + loanAmount * interest;
}

export function calculateMonthlyInstallment(
  totalAmount: number,
  nbMonths: number,
): number {
  return totalAmount / nbMonths;
}

export function calculateAndFormatDate(months: number) {
  const today = new Date();

  today.setMonth(today.getMonth() + months);

  if (today.getMonth() > 11) {
    today.setMonth(today.getMonth() - 12);
    today.setFullYear(today.getFullYear() + 1);
  }

  const formattedDate = today.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}

export function formatCurrency(total: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(total);
}
