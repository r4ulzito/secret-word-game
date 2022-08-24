import "./GameOver.css";

const GameOver = ({ retry, score, guessedWords }) => {
  return (
    <div className="game_over">
      <h1>FIM DE JOGO!</h1>
      <div className="score_container">
        <h2 className="word_score">
          Palavras Adivinhadas: <span>{guessedWords}</span>
        </h2>
        <h2 className="final_score">
          Pontuação Final: <span>{score}</span>
        </h2>
      </div>
      <button onClick={retry}>Recomeçar</button>
    </div>
  );
};

export default GameOver;
