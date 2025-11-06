import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client'
import Board from './Board'
import { calculateWinner } from '../utils/gameUtils'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [socket, setSocket] = useState(null)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  const { winner, line } = calculateWinner(currentSquares)


  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);

    if (socket) {
      socket.send(JSON.stringify({ type: "RESET" }));
    }
  }


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (socket) {
      const index = nextSquares.findIndex((val, i) => val !== currentSquares[i]);
      socket.send(JSON.stringify({
        type: "MOVE",
        index: index,
        board: nextSquares
      }));
    }
  }


  function jumpTo(move) {
    setCurrentMove(move)
  }


  //conexion websocket
useEffect(() => {
    // Usa la URL de tu backend (sin /game, SockJS lo agrega)
    const sock = new SockJS("https://websockets-h2b5d4duhddmh2er.westeurope-01.azurewebsites.net/game");
    
    sock.onopen = () => {
      console.log("✅ Conectado al servidor WebSocket");
      setSocket(sock);
    };

    sock.onmessage = (event) => {
      console.log("📨 Mensaje recibido:", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "RESET") {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        return;
      }

      if (data.type === "MOVE" && data.board) {
        setHistory([data.board]);
        setCurrentMove(0);
      }
    };

    sock.onerror = (error) => {
      console.error("❌ Error WebSocket:", error);
    };

    sock.onclose = () => {
      console.log("🔌 Conexión WebSocket cerrada");
    };

    return () => sock.close();
  }, []);



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

      <button className="reset-button" onClick={resetGame}>
        Reiniciar juego
      </button>
    </div>

    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
);


}