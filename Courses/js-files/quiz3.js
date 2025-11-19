const questions = [
    {
        question: "choose the correct family tree of mohamed the prophet",
        answers: [
            {text: "his mother : AMENA , his father : ABDALLAH , one of his uncles : HAMZA , his grandfather : ABDMOUTALIB" , correct: true},
            {text: "his mother : KHADIDJA , his father : Mohammed , one of his uncles : HAMZA , his grandfather : ABDMOUTALIB" , correct: false},
            {text : "his mother : AMENA , his father : ABDALLAH , one of his uncles : abujahil, his grandfather : abutalib" , correct: false},

        ]
    },
      {
        question: "What do real muslims follow?",
        answers: [
            {text: "ONLY QUORAN" , correct: false},
            {text: "BOTH QUORAN AND SUNNAH" , correct: true},
            {text : "ONLY HADITH" , correct: true},

        ]
    },
      {
        question: "HOW many islam versions exist in the world?",
        answers: [
            {text: "4 VERSIONS" , correct: false},
            {text: "ONE VERSION , however 4 madahibs exist" , correct: true},
            {text : "2 VERSIONS , one called quoranic and second is sunnah" , correct: false},

        ]
    },
      {
        question: "why is it important to know the weak ahadiths along with the strong ones?",
        answers: [
            {text: "because people can lie using the name of the prophet to set false judgements under the name of islam" , correct: true},
            {text: "to apply them too , so if no win no loss" , correct: false},
            {text : "it's not , we shouldn't care" , correct: false},

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
  