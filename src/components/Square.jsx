export default function Square({ value, onSquareClick, highlight }) {
  const className = highlight ? "square highlight" : "square"
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  )
}
