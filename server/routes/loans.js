import { Router } from 'express';
import Loans from '../controller/loanController';
import Validate from '../middleware/validateLoanInput';
import Verify from '../middleware/verifyToken';

const loanRoutes = Router();

loanRoutes.post('/', Validate.loanApplication, Verify.userAccess, Loans.create);
loanRoutes.get('/', Validate.getRequest, Loans.getAll);
loanRoutes.get('/:id', Validate.id, Loans.getOne);
loanRoutes.patch('/:id', Validate.loanApproval, Loans.LoanApproval);

// Loan Repayments
loanRoutes.post('/:id/repayment', Validate.repayment, Loans.postLoanRepayment);
loanRoutes.get('/:id/repayments', Validate.id, Loans.getLoanRepayment);

export default loanRoutes;
