import repaymentDb from '../db/repayments.json';
import { getDate } from '../utils/helperUtils';

class RepaymentModel {
  static create(loanId, amount) {
    const date = getDate();
    const newLoanRepayment = {
      id: repaymentDb.length + 1,
      loanId,
      amount,
      createdOn: date,
    };
    repaymentDb.push(newLoanRepayment);
    return repaymentDb[repaymentDb.length - 1];
  }

  static findByLoanId(loanId) {
    const loanRepayments = repaymentDb.filter(repayment => repayment.loanId === loanId);
    return loanRepayments;
  }
}

export default RepaymentModel;