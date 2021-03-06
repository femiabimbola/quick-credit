import { errorRes } from '../utils/responseHandler';

class Validate {
  static loanApplication(req, res, next) {
    req.checkBody('firstName')
      .notEmpty()
      .withMessage('First Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('First Name Input is Invalid')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('lastName')
      .notEmpty()
      .withMessage('Last Name is required')
      .trim()
      .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
      .withMessage('Last Name Input is Invalid')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
      .withMessage('Input a valid email')
      .customSanitizer(name => name.toLowerCase());
    req.checkBody('amount')
      .notEmpty()
      .withMessage('Amount is required')
      .trim()
      .isNumeric()
      .withMessage('Input a valid Amount')
      .isInt({ min: 10000, max: 200000 })
      .withMessage('Amount must be a value between 10000 and 200000');
    req.checkBody('tenor')
      .notEmpty()
      .withMessage('tenor is required')
      .trim()
      .isNumeric()
      .isInt()
      .withMessage('Input a valid tenor')
      .isInt({ min: 1, max: 12 })
      .withMessage('tenor must be a value between 1 and 12');
    const errors = req.validationErrors();
    if (errors) {
      return errorRes(next, 400, errors[0].msg);
    }
    next();
  }

  static getRequest(req, res, next) {
    req.checkQuery('status')
      .optional()
      .equals('approved')
      .withMessage('Invalid status query');
    req.checkQuery('repaid')
      .optional()
      .isIn(['true', 'false'])
      .withMessage('Invalid repaid query');
    const errors = req.validationErrors();
    if (errors) {
      return errorRes(next, 400, errors[0].msg);
    }
    next();
  }

  static id(req, res, next) {
    req.checkParams('id')
      .notEmpty()
      .trim()
      .isNumeric()
      .isInt()
      .withMessage('Input a valid ID parameter');
    const errors = req.validationErrors();
    if (errors) {
      return errorRes(next, 400, errors[0].msg);
    }
    next();
  }

  static loanApproval(req, res, next) {
    req.checkParams('id')
      .notEmpty()
      .trim()
      .isNumeric()
      .isInt();
    req.checkBody('status')
      .notEmpty()
      .trim()
      .customSanitizer(status => status.toLowerCase())
      .isIn(['approved', 'rejected'])
      .withMessage('Invalid Status. It should be approved or rejected');
    const errors = req.validationErrors();
    if (errors) {
      return errorRes(next, 400, errors[0].msg);
    }
    next();
  }

  static repayment(req, res, next) {
    req.checkParams('id')
      .notEmpty()
      .trim()
      .isNumeric()
      .isInt()
      .withMessage('Input a valid ID parameter');
    req.checkBody('amount')
      .notEmpty()
      .withMessage('Amount is required')
      .trim()
      .isNumeric()
      .withMessage('Input a valid Amount');
    const errors = req.validationErrors();
    if (errors) {
      return errorRes(next, 400, errors[0].msg);
    }
    next();
  }
}

export default Validate;
