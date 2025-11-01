import { useState } from 'react'
import Board from './Board'
import { calculateWinner } from '../utils/gameUtils'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const { winner, line } = calculateWinner(currentSquares)

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move === currentMove) {
      description = `Estás en el movimiento #${move}`
    } else if (move > 0) {
      description = `Ir al movimiento #${move}`
    } else {
      description = "Ir al inicio del juego"
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <span className="current-move">{description}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningLine={line}
        />
        {winner && <div className="winner">¡Ganador: {winner}!</div>}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
