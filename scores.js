var printScore = JSON.parse(localStorage.getItem("highScore"))
var highScoreSection = document.getElementById("highScoreSection")

// print the score for every one in the array
console.log(printScore)
for(i=0; i < printScore.length; i++)
{
    var score = document.createElement("li")
    score.textContent = printScore[i].initials + ": " + printScore[i].score 
    highScoreSection.appendChild(score)
}