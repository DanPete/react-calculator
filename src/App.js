import React from 'react';
import './App.scss';
import Button from './Button'
import Display from './Display'
import { buttons } from './utils/buttons'
import { activeClass } from './utils/helpers'
import calculate from './utils/calculate'

const operations = ['/', 'x', '-', '+']


class App extends React.Component {
  state = {
    currentVal: '',
    prevVal: '',
    tempResult: '',
    displayFormula: '0',
    operation: '',
    useEqual: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey, false)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKey, false)
  }

  handleKey = (e) => {
    buttons.forEach((button) => {
      if(e.keyCode === button.keyCode){
        this.inputConditional(button.value, e)
        const calcButton = document.querySelector(`#${button.key}`)
        activeClass(calcButton)
      } 
    })
  }

  handleClick = (e) => {
    this.inputConditional(e.currentTarget.value)
    activeClass(e.currentTarget)
  }

  inputConditional = (value, e) => {
    this.handleDisplay(value)

    if (operations.includes(value)) {
      e && e.preventDefault()
      if (value === '-' && this.state.currentVal === '') {
        this.handleNumber(value)
      } else {
        this.handleOperation(value)
      }
    } else if (value === '=') {
      this.handleEqual()
    } else if (value === 'C') {
      this.handleClear()
    } else {
      this.handleNumber(value)
    }
  }

  handleDisplay = (value) => {
    if(value === "=") return false;
    const { displayFormula } = this.state
    if (displayFormula !== '0') {
      this.setState({
        displayFormula: this.state.displayFormula + value
      })
    } else {
      this.setState({
        displayFormula: value
      })
    }
  }

  handleNumber = (value) => {
    const { currentVal } = this.state
    const nextValue = currentVal + value

    this.setState({
      currentVal: nextValue,
    })
  }

  handleOperation = (operator) => {
    const { currentVal, prevVal, operation, tempResult, useEqual } = this.state
    if (currentVal && prevVal && !useEqual && currentVal !== '-') {
      const prevNumber = tempResult || prevVal
      const result = calculate(currentVal, prevNumber, operation)
      this.setState({
        tempResult: result
      })
    }
    
    if(currentVal === '-') this.setState({ currentVal: ''})
    
    if(currentVal && currentVal !== '-') {
      this.setState({
        currentVal: '',
        prevVal: currentVal,
      })
    }

    this.setState({
      operation: operator,
      useEqual: false
    })
  }

  handleEqual = () => {
    const { currentVal, prevVal, operation, tempResult, useEqual } = this.state

    if (useEqual || currentVal ==='' || prevVal === '') return false
    
    const prevNumber = tempResult || prevVal
    const result = calculate(currentVal, prevNumber, operation)
    // console.log({ currentVal, prevNumber, prevVal, operation, result })
    this.setState({
      currentVal: result,
      prevVal: currentVal,
      tempResult: result,
      displayFormula: result,
      useEqual: true,
    })
  }

  handleClear = () => {
    this.setState({
      currentVal: '',
      prevVal: '',
      displayFormula: '0',
      tempResult: '',
      operation: '',
      useEqual: false,
    })
  }

  render() {
    const { displayFormula, currentVal } = this.state
    return (
      <div className="calculator">
        <Display displayFormula={displayFormula} />
        <div className="button-wrapper">
          {buttons.map((button, idx) => (
            <Button key={idx} button={button} handleClick={this.handleClick} currentVal={currentVal} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
