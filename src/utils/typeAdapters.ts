
import { Investment as AdminInvestment } from "@/types/admin";
import { Investment as InvestorInvestment } from "@/types/investment";

/**
 * Converts admin Investment type to investor Investment type
 */
export const adminToInvestorInvestment = (adminInvestment: AdminInvestment): InvestorInvestment => {
  // Create a placeholder conversion from admin to investor investment
  return {
    id: parseInt(adminInvestment.id.replace('mock-', '')) || Math.floor(Math.random() * 1000),
    name: `Investment ${adminInvestment.type}`,
    amount: adminInvestment.amount,
    target: adminInvestment.amount * 2.5, // Just a placeholder calculation
    raised: adminInvestment.amount * 0.8, // Just a placeholder calculation
    date: adminInvestment.date,
    status: adminInvestment.status === "Completed" ? "Active" : "Running",
    roi: "12% - 18%", // Placeholder
    endDate: new Date(new Date(adminInvestment.date).getTime() + (90 * 24 * 60 * 60 * 1000)).toLocaleDateString(), // 90 days from date
  };
};

/**
 * Converts array of admin Investment objects to investor Investment objects
 */
export const convertInvestmentsForInvestor = (adminInvestments: AdminInvestment[]): InvestorInvestment[] => {
  return adminInvestments.map(adminToInvestorInvestment);
};
