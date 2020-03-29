import React from 'react'

class Button extends React.Component {

  render() {
    const { value, type, key, keyCode } = this.props.button
    const { currentVal } = this.props
    let containsDecimal = currentVal.includes('.') && key === 'decimal'
    return (
      <button
        id={key}
        className={type}
        value={value}
        onClick={this.props.handleClick}
        disabled={containsDecimal}
        data-key-code={keyCode}
      >
        {value}
      </button>
    )
  }
}

export default Button
