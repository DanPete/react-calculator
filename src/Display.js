import React from 'react'

export class Display extends React.Component {
  render() {
    const { displayFormula } = this.props
    return (
      <div id="display" className="calculator-display">
        <div className="display-inner">
          {displayFormula}
        </div>
      </div>
    )
  }
}

export default Display
