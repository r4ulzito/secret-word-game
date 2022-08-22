import "./Game.css";

const Game = ({ verifyLetter }) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica: <span>Dica...</span>
      </h3>
      <div className="word_container">
        <span className="letter">A</span>
        <span className="blank_square"></span>
      </div>
      <div className="letter_container">
        <p>Chute uma letra:</p>
        <form>
          <input type="text" name="letter" maxLength={1} required />
          <button>Chutar</button>
        </form>
      </div>
      <div className="wrong_letters_container">
        <p>Letras chutadas: </p>
        <span>a,</span>
        <span>b,</span>
      </div>
    </div>
  );
};

export default Game;
