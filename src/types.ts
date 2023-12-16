export type Loan = "Automobile Loan" | "Housing Loan" | "Cash Loan";

export interface Product {
  id: string;
  interest: string;
  name: Loan;
  min_amount: string;
  max_amount: string;
  min_tenure: string;
  max_tenure: string;
  image: string;
}
