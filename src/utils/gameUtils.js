export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return { winner: null, line: null }
}

export function getStatus(xIsNext, squares) {
  const { winner } = calculateWinner(squares)
  if (winner) return `Ganador: ${winner}`
  if (squares.every(Boolean)) return "¡Empate!"
  return `Siguiente jugador: ${xIsNext ? "X" : "O"}`
}
