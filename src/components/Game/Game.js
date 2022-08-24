// styles
import "./Game.css";

// react
import { useState, useRef } from "react";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  record,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="record_points">
        Maior Pontuação:<span> {record}</span>
      </p>
      <p>
        <span>Pontuação: {score}</span>
      </p>

      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas!</p>
      <div className="word_container">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blank_square"></span>
          )
        )}
      </div>
      <div className="letter_container">
        <p>Chute uma letra</p>
        <form onSubmit={handleSubmit} autocomplete="off">
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Chutar</button>
        </form>
      </div>
      <div className="wrong_letters_container">
        <p>Letras chutadas: </p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
