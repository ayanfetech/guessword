// esigned by Ayanfe Technologies
// 
// 
// 
// Inspired by CodingNepal
// 
// 
// 
// Declaring variable
const resetBtn = document.querySelector('.reset-btn'),
okayBtn = document.querySelector('.correct-box .okbtn'),
text = document.querySelector('.correct-box .text'),
inputs = document.querySelector('.inputs'),
correctBox = document.querySelector('.correct-box'),
wrongLetters = document.querySelector('.wrong-letter span'),
guessLeft = document.querySelector('.guess-left span'),
hint = document.querySelector('.hint span'),
typingInput = document.querySelector('.typing-input');
let word = "",
correct = [],
incorrect = [],
maxGuess = "";


function randomWord() {
   //Getting words from words.js
   let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
   maxGuess = 8; incorrect = []; correct = [];
   //assigning random word to word variable
   word = ranObj.word;
   //assigning its hint to hint
   hint.innerText = ranObj.hint.toUpperCase();
   //DOM of guess left
   guessLeft.innerText = maxGuess;
   //DOM of wrongLetters
   wrongLetters.innerText = incorrect;
   // console.log(word);
   let html = "";
   //showcasing input element per letters in the word
   for (let i = 0; i < word.length; i++) {
      html += `<input type="text" disabled>`
   }
   inputs.innerHTML = html;
}
//calling the function on load
randomWord();

function initGame(e) {
   let userInput = e.target.value;
   let key = userInput.toLowerCase();
   //checking user's input
   if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)) {
      if (word.includes(key)) {
         for (let j = 0; j < word.length; j++) {
            if (word[j] === key) {
               correct.push(key);
               inputs.querySelectorAll('input')[j].value = key;
            }
         }
      } else {
         maxGuess--;
         incorrect.push(` ${key}`.toUpperCase());
      }
      guessLeft.innerText = maxGuess;
      wrongLetters.innerText = incorrect;
   }
   typingInput.value = "";
   setTimeout(()=> {
      if (correct.length === word.length) {
         correctBox.classList.add('active');
         text.innerText = `Congrats! You found the word ${word.toUpperCase()}`;
         okayBtn.addEventListener('click', (e)=> {
            e.preventDefault();
            randomWord();
            correctBox.classList.remove('active');
         });

      } else if (maxGuess < 1) {
         correctBox.classList.add('game-over');
         text.innerText = `Game Over! You have run out of guesses`;
         okayBtn.addEventListener('click', (e)=> {
            e.preventDefault();
            for (let p = 0; p < word.length; p++) {
                inputs.querySelectorAll('input')[p].value = word[p];
            }
            correctBox.classList.remove('game-over')
         });
      }
   });


}
resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
inputs.addEventListener('click', ()=> typingInput.focus());
document.addEventListener('keydown', ()=> typingInput.focus());