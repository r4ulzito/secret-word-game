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

// Estagios do Jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    // Escolhe uma categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Escolhe uma palavra aleatoria dessa categoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  };

  // começa o jogo
  const startGame = () => {
    // escolhe a categoria e a palavra
    const { category, word } = pickWordAndCategory();

    // cria um array com as letras da palavra
    let wordLetters = word.toLowerCase().split("");

    // Seta os States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // processa a letra do input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // reinicializa o jog
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
