//Jeudi le 27 juin 2020
//@author Noula Darlin

const start = document.querySelector('.start')
const btnPlay = document.querySelector('.btnPlay')
const question = document.querySelector('.question')
const qImg = document.querySelector('.qImg')
const progress = document.querySelector('.progress')
const questionContainer = document.querySelector('.question_board')
const choiceA = document.querySelector('#choiceA')
const choiceB = document.querySelector('#choiceB')
const choiceC = document.querySelector('#choiceC')
const choiceD = document.querySelector('#choiceD')
const counter = document.querySelector('.count')
const timeGauge = document.querySelector('.etimeGauge')
const scoreContainer = document.querySelector('.score_container')



let lastQuestion = questions.length -1
let currentQuestion = 0
let TIMER 
let count = 0
let gaugeWidth = 200
let timeSpce = 5
let score = 0
let gaugeUnit = gaugeWidth/timeSpce
btnPlay.addEventListener('click',() =>{
    start.style.display = 'none'
    questionContainer.style.display = 'block'
    displayCounter()
    TIMER = setInterval(displayCounter,1000)
    displayQuestion()
    displayProgress()
    count  = 0
})


function displayQuestion() {
    let q = questions[currentQuestion]
    question.innerHTML = `<h2> ${q.question} </h2>`
    qImg.innerHTML = `<img src=${q.img_url}>`
    choiceA.innerHTML = q.choiceA
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC
    choiceD.innerHTML = q.choiceD
}
function displayCounter(){
    if(count<=5){
        counter.innerHTML = count
        timeGauge.style.width = gaugeUnit * count+'px'
        count++
    }
    else{
        count = 0
        ansWrong()
    
    if(currentQuestion<lastQuestion){
        count = 0
        currentQuestion++
        
        displayQuestion()
    }
    else{
        clearInterval(TIMER)
        scoreDisplay()
    }
}
}

function displayProgress(){
    for (let index = 0; index < questions.length; index++) {
        progress.innerHTML += `<div class='prog' id=${index} ></div>`
        
    }
}

function checkAnswer  (answer){
    if(answer == questions[currentQuestion].correct){
        score++
        ansCorrect()
    }
    
    else{
        
        ansWrong()
    }
    count = 0
    if(currentQuestion<lastQuestion){
        currentQuestion++
        displayQuestion()
    }
    else{
        clearInterval(TIMER)
        scoreDisplay()
    }
}

function ansCorrect(){
    document.getElementById(currentQuestion).style.backgroundColor='rgb(21, 133, 231)'
}
function ansWrong(){
    document.getElementById(currentQuestion).style.backgroundColor='red'
}


function scoreDisplay(){
    scoreContainer.style.display = 'block'
    questionContainer.style.opacity = 0.4
    let scorePercent = Math.round(score /questions.length *100)
    let img
    if(scorePercent>=80){
        img = '5.png'
    }
    else if(scorePercent>=60){
        img = '4.png'
    }
    else if(scorePercent>=40){
        img = '3.png'
    }
    else if(scorePercent>=20){
        img = '2.png'
    }
    else{
        img = '1.png'
    }
    let btn = document.createElement('button')
    
    scoreContainer.innerHTML = `<img src=${img}>`
    scoreContainer.innerHTML += `<h2> votre score est de ${scorePercent}%</h2>`
    
    scoreContainer.appendChild(btn)
    btn.addEventListener('click',() => window.location.reload())
}