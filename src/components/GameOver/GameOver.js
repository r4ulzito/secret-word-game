import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div className="game_over">
      <h1>FIM DE JOGO!</h1>
      <h2>
        Pontuação Final: <span>{score}</span>
      </h2>
      <button onClick={retry}>Resetar Jogo</button>
    </div>
  );
};

export default GameOver;
