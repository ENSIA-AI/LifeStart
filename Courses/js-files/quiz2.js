const questions = [
    {
        question: "What is the relationship between quoran and scientific facts?",
        answers: [
            {text: "so far , many facts that were scientifically proven were mentioned a long time ago in the quoran" , correct: true},
            {text: "Quoran contains religious facts only , has nothing to do with science" , correct: false},
            {text : "Every thing in science is mentioned in the quoran" , correct: false},

        ]
    },
      {
        question: "How are mental breakdowns healed in slamic way?",
        answers: [
            {text: "Reading the quoran consistenly , praying on time , duaa always and seek help from the greatest Allah" , correct: true},
            {text: "practise supernatural rituals using energy experts" , correct: false},
            {text : "in islam , mental breakdowns do not exist , and any sign of such thing is lack of belief and no sign of good muslim" , correct: false},

        ]
    },
      {
        question: "How can someone memorize the quoran fast?",
        answers: [
            {text: "by repeating what he hears everyday" , correct: false},
            {text: "understanding alone is quite enough" , correct: false},
            {text : "there's no such fast memorization , quoran lives with u , it takes time and efforts , deep understanging for each verse and patience" , correct: true},

        ]
    },
      {
        question: "muslims do not believe in jesus",
        answers: [
            {text: "true , they consider him as only christians figure" , correct: false},
            {text: "False , they do believe he's the Only GOD on earth" , correct: false},
            {text : "false they do believe in him as a prophet sent by ALLAH , like mohammed" , correct: true},

        ]
    },
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
       button.addEventListener("click" , selectAnswer);
    
    }
    )
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
   const selectedbtn = e.target;
   const isCorrect = selectedbtn.dataset.correct === "true";
   if(isCorrect){
     selectedbtn.classList.add("correct");
     score++;
     correctCount++;
   }else{
     selectedbtn.classList.add("incorrect");
   }
   Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
   });
   nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  if(correctCount >= 3){
    nextButton.innerHTML = "Unlock next"
    nextButton.style.display = "block";
  }
  else{
    nextButton.innerHTML = "try again , your score is low";
    nextButton.style.display = "block";
  }
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click" , () => {
  if(currentQuestionIndex < questions.length ){
    handleNextButton();  
}
   else{
    startQuiz();
   }
});

startQuiz();
