const calculate = (currentNumber, prevNumber, operator) => {
  let result = null
  switch (operator) {
    case '+':
      result = (parseFloat(prevNumber) + parseFloat(currentNumber)).toString()
      break;
    case '-':
      result = (parseFloat(prevNumber) - parseFloat(currentNumber)).toString()
      break;
    case 'x':
      result = (parseFloat(prevNumber) * parseFloat(currentNumber)).toString()
      break;
    case '/':
      result = (parseFloat(prevNumber) / parseFloat(currentNumber)).toString()
      break;
    default:
      console.log('error')
  }
  return result
}

export default calculate