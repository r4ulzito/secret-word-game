// styles
import "./App.css";
// react
import { useCallback, useEffect, useState } from "react";
// data
import { wordsList } from "./data/words";
// components
import StartScreen from "./components/StartScreen/StartScreen";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

// estagios do Jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

// quantidade padrao de tentativas
const guessesQtd = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);
  const [guessedWords, setGuessedWords] = useState(0);
  const [record, setRecord] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    // escolhe uma categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // escolhe uma palavra aleatoria dessa categoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  // começa o jogo
  const startGame = useCallback(() => {
    // reseta os states de palavra
    clearLetterStates();

    // escolhe a categoria e a palavra
    const { category, word } = pickWordAndCategory();

    // cria um array com as letras da palavra
    let wordLetters = word.toLowerCase().split("");

    // seta os States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // processa a letra do input
  const verifyLetter = (letter) => {
    const normLetter = letter.toLowerCase();

    // Verifica se a letra é um caractere especial ou numero
    if (!normLetter.match("[a-zA-Z-ç]")) {
      return;
    }
    // verifica se a letra ja foi utilizada
    if (
      guessedLetters.includes(normLetter) ||
      wrongLetters.includes(normLetter)
    ) {
      return;
    }

    // Adiciona a letra adivinhada ou remove uma tentativa
    if (letters.includes(normLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normLetter,
      ]);

      setGuesses((actualGuees) => actualGuees - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  const clearGameStates = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGuessedWords(0);
  };

  // verifica se as tentativas acabaram
  useEffect(() => {
    if (guesses <= 0) {
      // reseta todos os states de letras
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // verifica condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // condição de vitória
    if (
      guessedLetters.length === uniqueLetters.length &&
      guessedLetters.length !== 0
    ) {
      // adciona score
      setScore((actualScore) => (actualScore += 100));

      // adiciona ao contador de palavras adivinhadas
      setGuessedWords((actualGuessesWords) => (actualGuessesWords += 1));
      // reseta o jogo com uma nova palavra
      startGame();
    }

    if (score >= record) {
      setRecord(score);
    }
  }, [guessedLetters, letters, startGame, record, score, setRecord]);

  // reinicializa o jogo
  const retry = () => {
    // reseta pontuação e tentativas
    clearGameStates();

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          record={record}
        />
      )}
      {gameStage === "end" && (
        <GameOver retry={retry} score={score} guessedWords={guessedWords} />
      )}
    </div>
  );
}

export default App;
