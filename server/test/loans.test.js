import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('POST /loans', () => {
  it('SHOULD NOT submit the loan Form if firstName is omitted', (done) => {
    const loanApplication = {
      lastName: 'wagner',
      email: 'mikewagner@andela.com',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the loan Form if lastName is omitted', (done) => {
    const loanApplication = {
      firstName: 'michael',
      email: 'mikewagner@andela.com',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the loan Form if email is omitted', (done) => {
    const loanApplication = {
      firstName: 'michael',
      lastName: 'wagner',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the loan Form if amount is omitted', (done) => {
    const loanApplication = {
      firstName: 'michael',
      lastName: 'wagner',
      email: 'mikewagner@andela.com',
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the loan Form if tenor is omitted', (done) => {
    const loanApplication = {
      firstName: 'michael',
      lastName: 'wagner',
      email: 'mikewagner@andela.com',
      amount: 100000,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the form if amount is not between 10000 and 200000', (done) => {
    const loanApplication = {
      firstName: 'michael',
      lastName: 'wagner',
      email: 'mikewagner@andela.com',
      amount: 1000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the form if tenor is not between 1 and 12', (done) => {
    const loanApplication = {
      firstName: 'michael',
      lastName: 'wagner',
      email: 'mikewagner@andela.com',
      amount: 100000,
      tenor: 60,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the form if User has a Pending Loan Application', (done) => {
    const loanApplication = {
      firstName: 'Tod',
      lastName: 'Mahog',
      email: 'rdust1b@squidoo.com',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD NOT submit the form if User has an unpaid Loan', (done) => {
    const loanApplication = {
      firstName: 'Tod',
      lastName: 'Mahog',
      email: 'djurgen1c@pcworld.com',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('status').eql(400);
        done(err);
      });
  });
  it('SHOULD submit the form', (done) => {
    const loanApplication = {
      firstName: 'Tom',
      lastName: 'huddlestone',
      email: 'tomblack@mandela.com',
      amount: 100000,
      tenor: 6,
    };
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanApplication)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done(err);
      });
  });
});
