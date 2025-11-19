const questions = [
    {
        question: "Why is Aqueedah important in Islam?",
        answers: [
            {text: "It refers to the sets of beliefs a muslim should carry in heart , without it the actions lack correct understanding despite their impotance too" , correct: true},
            {text: "it refers to the belief someone should carry , which is enough to be a complete muslim" , correct: false},
            {text : "it's not important , and as long as someone is practising praying he is a good muslim" , correct: false},

        ]
    },
      {
        question: "What is the core concept of el-tawhid",
        answers: [
            {text: "believing Allah is the strongest GOD existing" , correct: false},
            {text: "believing ALLAH is the Strongest heir in the universe" , correct: false},
            {text : "believing ALLAH is the only one GOD to ever exist , the one leading universe after creating it , that has niether father nor child" , correct: true},

        ]
    },
      {
        question: "What is el-quoran?",
        answers: [
            {text: "a holy book filled by the literal words of GOD through his prophet Mohammed of which there is one and only verse of it since the first day of existing" , correct: true},
            {text: "holy book written by prophet Mohammed based on his wisdom and knowledge" , correct: false},
            {text : "a holy book written by muslims with strong and gifted belief , came from their supernatural power to manifest strong words" , correct: false},

        ]
    },
      {
        question: "What does sunnah represent in Islam?",
        answers: [
            {text: "It refers to the sets of actions , terms , and conffirmations by the prophet mohammed , enherited by elsahabah to all muslims around the world" , correct: true},
            {text: "it's set of what the prophet had told muslims to do , apart of what's mentioned in the quoran" , correct: false},
            {text : "it's set of actions , terms , and affirmations of the best muslims in the world" , correct: false},

        ]
    },
      {
        question: "In order to extract a religious judgement we use:",
        answers: [
            {text: "the opinion taken by the majority of the muslim community" , correct: false},
            {text: "the opinion of the muslims with the strongest belief and knowledge only" , correct: false},
            {text : "the quoran , if not mentioned the sunnah , if not mentioned we move the opinion of el-machyikh and quiyas" , correct: true},

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
  if(correctCount >= 4){
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
  