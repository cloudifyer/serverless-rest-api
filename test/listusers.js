'use strict';

// tests for listusers
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('listusers', '/handler.js', 'listusers');

describe('listusers', () => {
  before((done) => {
    done();
  });

  it('returns users', () => {
    return wrapped.run({}).then((response) => {
      expect(response).to.not.be.empty;
    });
  });
});
