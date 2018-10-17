import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultTable from '../../components/ResultTable'
import { outputSelector } from '../../selectors/resolution';


class OutputLogger extends Component {
  render() {
    return (
      <ResultTable output={this.props.output} />
    );
  }
}

OutputLogger.propTypes = {
  output: PropTypes.object,
};

export default connect(
  state => ({
    output: mockResults,
  }),
  null,
)(OutputLogger);

const mockResults = [{
  testCase: { expected: 1234 },
  output: 1234,
  passed: true
},
{
  testCase: { expected: 2345 },
  output: 23456,
  passed: false
},
{
  testCase: { expected: "Hello world" },
  output: "Hola mundo",
  passed: false
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
},
{
  testCase: { expected: "Caca" },
  output: "Caca",
  passed: true
}]
