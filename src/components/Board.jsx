import Square from './Square'
import { calculateWinner, getStatus } from '../utils/gameUtils'

export default function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    const { winner } = calculateWinner(squares)
    if (squares[i] || winner) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares)
  }

  function renderSquare(i) {
    const highlight = winningLine && winningLine.includes(i)
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={highlight}
      />
    )
  }

  const boardRows = [0, 1, 2].map(r => (
    <div key={r} className="board-row">
      {[0, 1, 2].map(c => renderSquare(r * 3 + c))}
    </div>
  ))

  const status = getStatus(xIsNext, squares)

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  )
}
