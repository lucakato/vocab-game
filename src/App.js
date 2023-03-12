import axios from "axios"
import { useEffect, useState } from "react"

const App = () => {
  // chosenLevel initially set to null but can be changed later using setChosenLevel
  // Note that setChosenLevel is a function
  // react hook
  const [chosenLevel, setChosenLevel] = useState(null)
  const [chosenTest, setChosenTest] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)


  //console.log(chosenTest)
  console.log(words)


  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      // takes in a chosenLevel so we can pass this into our req
      params: {level: chosenLevel, area: 'gmat'},
    };
    // returns an object
    axios.request(options).then((response) => {
        console.log(response.data);
        setWords(response.data) // change state

    }).catch((error) => {
        console.error(error);
    });
  }

  // Happens after the app renders
  // Runs whenever chosenLevel changes (line at the very end). If chosenLevel exists, get a random word
  useEffect(() => {
    if (chosenLevel/* && chosenTest*/) getRandomWords()}, [chosenLevel/*, chosenTest*/]);

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    if (optionIndex === correctAnswer){
      setCorrectAnswers([...correctAnswers, option]) // Add a new value to CorrectAnswers array, spread operator, using useState
      setScore((score) => score + 1) // If correct, get current score and +1

    }
    else{
      setScore((score) => score - 1)
    }
    setClicked([...clicked, option]) // Again add option to clicked array using useState
  }

  return (
    <div className="app">
      {!chosenLevel/* && !chosenTest */&& <div className="level-selector">
        <h1>Vocabulary Study App</h1>
        <p>Select your level to start</p>
        <select name="levels" id="levels" value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>Select a level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
        </select>

        <p>Select the test you want to study for! (es, ms, hs, ksat, toeic, toefl, teps, sat, ielts, gre, gmat, overall)</p>
        <select name="test-type" id="test-type" value={chosenTest} onChange={(e) => setChosenTest(e.target.area)}>
          <option value={null}>Select a type of exam you want to study for!</option>
          <option value="es">ELementary School</option>
          <option value="ms">Middle School</option>
          <option value="hs">High School</option>
          <option value="ksat">KSAT</option>
          <option value="toeic">TOEIC</option>
          <option value="teofl">TOEFL</option>
          <option value="teps">TEPS</option>
          <option value="sat">SAT</option>
          <option value="ielts">IELTS</option>
          <option value="gre">GRE</option>
          <option value="gmat">GMAT</option>
          <option value="overall">All Exams Combined</option>
        </select>
      </div>}

      {chosenLevel /*&& chosenTest */&& words && <div className="question-area">
        <h1>Welcome to level: {chosenLevel}, exam you're preparing for is {chosenTest}</h1>
        <h3>Your current score is: {score}</h3>

        <div className="questions">
          {words.quizlist.map((question, _questionIndex) => (  // Map the array onto the div
            <div key={_questionIndex} className="question-box">
              {question.quiz.map((qWord, _index) => ( // map words for each question (quiz array) onto a p tag
                <p key={_index}>{qWord}</p> // give p tag a key otherwise there's warning
              ))}

              <div className={"question-buttons"}>
                {question.option.map((option, optionIndex) => ( // map each option onto a button
                  // if option exists in our clicked array, disable it.
                  <div key={optionIndex} className="question-button">
                    <button disabled={clicked.includes(option)} onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}>
                      {option}
                    </button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>))
          }
        </div>

        <button onClick={() => setChosenLevel(null)}>Go Back!</button>

      </div>}

    </div>
  );
}


export default App;
