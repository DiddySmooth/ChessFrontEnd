import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import socketIOClient from "socket.io-client";
import Chessboard from "chessboardjsx";
const ENDPOINT = "http://127.0.0.1:3001";
class HumanVsHuman extends React.Component {
    constructor(props){
        super(props)
        this.props = props
    }
  static propTypes = { children: PropTypes.func };
  state = {
    fen: "start",
    // square styles for active drop square
    dropSquareStyle: {},
    // custom square styles
    squareStyles: {},
    // square with the currently clicked piece
    pieceSquare: "",
    // currently clicked square
    square: "",
    // array of past game moves
    history: []
  };
  componentDidMount() {
    this.game = new Chess();
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.on('move', (msg) => {
      console.log('move',msg)
      let sourceSquare = msg.msg.sourceSquare
      let targetSquare = msg.msg.targetSquare
      this.onDrop(sourceSquare,targetSquare)
      this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
      });
      this.setState(({ history, pieceSquare }) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history })
      }));
      this.isGameOver()
  })
    socket.on('joined', (msg) => {
      console.log('hello',msg)
})
  }
  componentDidUpdate(prevProps){
    if(this.state.fen !== this.props.updateBoard && this.props.updateBoard !== null){
        console.log(this.props.updateBoard)
        this.setState({fen: this.props.updateBoard})
    }
  }
  isGameOver() {
      if(this.game.game_over() === true)
      console.log("Game Over")
  }
  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };
  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );
    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };
  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));
    // console.log('move',move)
    // console.log('target',sourceSquare,targetSquare)
    console.log('FEN',this.game.fen())
    this.isGameOver()
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    socket.emit('move', {sourceSquare, targetSquare})
  };
  onMouseOverSquare = square => {
    // get list of possible moves for this square
    let moves = this.game.moves({
      square: square,
      verbose: true
    });
    // exit if there are no moves available for this square
    if (moves.length === 0) return;
    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }
    this.highlightSquare(square, squaresToHighlight);
  };
  onMouseOutSquare = square => this.removeHighlightSquare(square);
  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };
  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return;
    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };
  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });
  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;
    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      isGameOver: this.isGameOver
    });
  }
}
export default function WithMoveValidation(props) {
  return (
    <div>
      <HumanVsHuman test={props.test} setFen={props.setFen} updateBoard={props.updateBoard}>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          isGameOver
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={720}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            isGameOver={isGameOver}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}
const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;
  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};