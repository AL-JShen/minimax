import React, { Component } from 'react';

class Table extends Component {

  render() {
    let tmp = [];
    for (var i = 0; i < 9; i++) {
      tmp.push(i)
    }
    return (
      <div className='grid'>
        {tmp.map((item, index) => (
          <button className="button" key={index} id={`button${index}`} onClick={() => {this.props.handlePlace(index)}}>&nbsp;</button>        ))}
      </div>
    );
  }

}

export default Table;