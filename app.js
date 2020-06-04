/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores,roundscore,activeplayer,gameplaying;
//  scores=[0,0];
//  roundscore=0;
//  activeplayer=0;
// // initially no dice will be shown 
// document.querySelector(".dice").style.display="none";
// // initially setting all scores 0
// document.querySelector("#score-0").innerHTML="0";
// document.querySelector("#current-0").innerHTML="0";
// document.querySelector("#score-1").innerHTML="0";
// document.querySelector("#current-1").innerHTML="0";

init();
var prevdice;
document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gameplaying)
    {
    
     // generating a random number
      var dice= Math.floor(Math.random()*6+1);
     // changing the dice images everytime a random number is generated
    var diceDOM=document.querySelector(".dice");

    diceDOM.style.display="block";
    diceDOM.src="dice-" + dice +".png";

    if(prevdice===6 && dice===6)
    {
        scores[activeplayer]=0;
        // document.querySelector("#current-"+activeplayer).innerHTML="0";
        document.querySelector("#score-"+activeplayer).innerHTML="0";
        nextplayer();

    }
    // updating the scores and round score
    else if(dice!==1)
    {
    roundscore+=dice;
    document.querySelector("#current-"+activeplayer).innerHTML=roundscore;
    }
     
    else
    {
   nextplayer();
    }
   prevdice=dice;
    }
     
});

//implementing the hold button
document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gameplaying)
    {
      
    scores[activeplayer]+=roundscore;
    document.querySelector("#score-"+activeplayer).innerHTML=scores[activeplayer];

    var input=document.querySelector(".final-score").value;
    var winningscore;

 //undefined null or 0 considered as false 
    if(input) //true conditio
    {
        winningscore=input;
    }
    else
    {
    winningscore=100;
    }
    //checking for winner
    if(scores[activeplayer]>=winningscore )
    {
     document.querySelector("#name-"+activeplayer).innerHTML="Winner!";
     document.querySelector(".dice").style.display="none";
     document.querySelector(".player-"+activeplayer+"-panel").classList.add("winner");
     document.querySelector(".player-"+activeplayer+"-panel").classList.remove("active");
     gameplaying=false;
    }
    else{
        //move onto next player after hold butn press 
    //same as else code above so making a dont repeat function
    nextplayer();

    }  
    }
    
});

document.querySelector(".btn-new").addEventListener("click", init);

//initialising function for a new round and at the start of game . setting all values to 0
function init(){
     scores=[0,0];
     roundscore=0;
     activeplayer=0;
     gameplaying=true;
    // initially no dice will be shown 
    document.querySelector(".dice").style.display="none";
    // initially setting all scores 0
    document.querySelector("#score-0").innerHTML="0";
    document.querySelector("#current-0").innerHTML="0";
    document.querySelector("#score-1").innerHTML="0";
    document.querySelector("#current-1").innerHTML="0";
    document.querySelector("#name-0").innerHTML="Player 1";
    document.querySelector("#name-1").innerHTML="Player 2";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
     document.querySelector(".player-1-panel").classList.remove("winner");
     document.querySelector(".player-0-panel").classList.add("active");


}

function nextplayer(){
    activeplayer===0 ? activeplayer=1 : activeplayer=0;
      //same as if activeplayer==1 then do this :  else do this
     roundscore=0;

     document.querySelector("#current-0").innerHTML="0";
     document.querySelector("#current-1").innerHTML="0";

     //changing background of active player by adding n removing active class
     document.querySelector(".player-0-panel").classList.toggle("active");
     document.querySelector(".player-1-panel").classList.toggle("active");

     document.querySelector(".dice").style.dispaly="none";
}