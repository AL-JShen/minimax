import React, { Component } from 'react';
import Table from './Table';

class Body extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: 'X',
      gOver: null,
      XStatus: [],
      OStatus: [],
    };
    this.handlePlace = this.handlePlace.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.freezeBoard = this.freezeBoard.bind(this);
  }
  
  handlePlace(num) {
    if (!(this.state.gOver)) {
      let pressedB = document.getElementById(`button${num}`);
      if (pressedB.innerText === "\u00a0") { //if only whitespace in there
        pressedB.innerText = this.state.player;
        if (this.state.player === 'X') {
          this.setState({XStatus: [...this.state.XStatus, pressedB.id.substr(-1)]}, function() { //log current position
            if (this.state.XStatus.length > 2) {
              this.checkStatus('X')
            }
          })
        } else if (this.state.player === 'O') {
          this.setState({OStatus: [...this.state.OStatus, pressedB.id.substr(-1)]}, function() {
            if (this.state.OStatus.length > 2) {
              this.checkStatus('O')
            }
          })
        }
        let pSwap = (this.state.player === 'X') ? ('O') : ('X');
        this.setState({player: pSwap}, () => {
          document.getElementById('status').innerText = (this.state.player + ' to move!'); //change text
        })
        
      }
    }
  }
  
  checkStatus(player) {
    const wins = [
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['0', '4', '8'],
      ['2', '4', '6']
    ];
    const playerStatus = player + 'Status';
    const currentStatus = this.state[eval('playerStatus')].sort((a, b) => (a - b)); //sort array into ascending numerical order
    wins.map((arr) => { 
      let count = 0
      arr.map((item) => {
        if (currentStatus.indexOf(item) >= 0) {
          count += 1;
        }
      })
      if (count > 2) { //win condition: placed positions contains all 3 required spots of a winning row
        this.freezeBoard();
        setTimeout(() => {
          document.getElementById('status').innerText = (player + ' wins!');
        }, 0.00000000000000000000000000000000000001); // ???????????????? no delay doesnt work
        console.log(arr);
        arr.map((key) => {
          document.getElementsByClassName("button")[key].style.color = '#a70e0e';
        })
      }
    })
  }
  
  freezeBoard() {
    this.setState({
      gOver: 1 //dont allow any more moves
    });
    
  }
  
  handleReset() {
    let currentB = document.getElementsByClassName("button");
    Object.keys(currentB).map((key) => { // Object.keys(a) where a = ['a', 'b', 'c'] would return ['0', '1', '2']
      currentB[key].innerText = "\u00a0";
      currentB[key].style.color = 'black';
    })
    this.setState({
      player: 'X',
      gOver: null,
      XStatus: [],
      OStatus: [],
    })
    document.getElementById('status').innerText = 'X to start!';
  }
  
  render() {
    return (
      <div className='body'>
        <h2 id='status'>X to start!</h2>
        <Table handlePlace={this.handlePlace} />
        <button id="reset" onClick={this.handleReset}>Reset Game</button>
      </div>
    );
  }
}

export default Body;