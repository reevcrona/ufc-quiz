const button = document.getElementById("generate-button");
const title = document.getElementById("title");
const container = document.querySelector(".container");
const triviaQuestion = document.getElementById("trivia-question");
const questionCount = document.getElementById("question-count");
const nextBtn = document.getElementById("next-question-btn");
const answerCounter = document.getElementById("answer-count");
const questionCountContainer = document.querySelector(".question-count-container");
const scoreContainer = document.querySelector(".score-container");

let data;
let currentQuestionIndex = 0;
let count = 1;
let answerCount = 0;

button.addEventListener("click", () => {
    fetch('http://localhost:9000/questions.json')
    .then(res => res.json())
    .then(responseData => {
        data = responseData;
        console.log(data);
        
        loadQuestion(data,currentQuestionIndex)
        checkAnswer(data,currentQuestionIndex)
        showInputs();
        questionCount.textContent = `${count} of ${data.length}`
        button.style.display = "none";
        questionCountContainer.style.opacity=1;
        scoreContainer.style.opacity =1;
        answerCounter.textContent = answerCount;

    })
    
    function loadQuestion(questions,index) {
        
        const currentQuestion = questions[index];
        triviaQuestion.textContent = currentQuestion.question;

        
        const radioInputs = document.querySelectorAll('input[name="answer"]');
        
        
        currentQuestion.options.forEach((option, optionIndex) => {
            
            radioInputs[optionIndex].value = option;
            
        });
    
        
        
    }


    function checkAnswer(answer, index){
        const radioInputs = document.querySelectorAll(`input[name="answer"]`);
        
        radioInputs.forEach(input => {
            input.addEventListener("click",() => {
                const turnOffInputs = radioInputs.forEach(input => {
                    input.disabled = true;
                });
                
                const selectedAnswer = input.value; 
                
                
                const correctAnswer = answer[index].answer;
                
                if(selectedAnswer === correctAnswer) {
                    console.log("correct");
                    input.classList.add("input-correct");
                    turnOffInputs;
                    nextBtn.style.display = "block";
                    answerCount++;
                    answerCounter.textContent = answerCount;
                    
                } else {
                    
                    input.classList.add("input-wrong");
                    turnOffInputs;
                    nextBtn.style.display = "block";
                    answerCounter.textContent = answerCount;
                    
                }
            });
        });
    }
    

    nextBtn.addEventListener("click", () => {
        count ++;
        currentQuestionIndex++;
        nextBtn.style.display = "none";
        loadQuestion(data,currentQuestionIndex);
        resetUi();
        questionCount.textContent = `${count} of ${data.length}`
        checkAnswer(data,currentQuestionIndex)
    })

const resetUi = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        input.disabled = false;
        input.classList.remove("input-wrong")
        input.classList.remove("input-correct")
    })
}
const showInputs = () => {
    const radioInputs = document.querySelectorAll(`input[name="answer"]`)

    radioInputs.forEach(input => {
        input.style.opacity = 1;
    })
}
});
