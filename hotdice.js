var runPoints=1000;
var pairsPoints=500;
var diceUnicode=['🎲','⚀','⚁','⚂','⚃','⚄', '⚅'];



function arraysEqual(a, b) { //javascript doesn't let you directly compare arrays because reasons
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


var evalPoints=function(diceArr){
	var points=0;
	var scoringDice=0;
    var pyramidPoint=false;
	var freqArr=[0,0,0,0,0,0,0];//inefficient to leave the 0 index unused but I'd prefer not to have to subtract 1 all over this code
	for (var i=0; i<diceArr.length; i++){
		freqArr[diceArr[i]]++;
	}
	
	//console.log(freqArr);

    
	//--------- mixed possibilities
	
	if (freqArr[1] >=3){
		points+=1000 * (Math.pow(2, freqArr[1]-3));
		scoringDice+=freqArr[1];
    }
		
	
	for (i=2; i<freqArr.length; i++){ //three of a kind or greater, other numbers
		if (freqArr[i] >=3){
			points+=i*100 * (Math.pow(2, freqArr[i]-3));
			scoringDice+=freqArr[i];
			}
		
	}
	
	if (freqArr[5]==1){
		points+=50;
		scoringDice++;
		}
	if (freqArr[5]==2){
		points+=100;
		scoringDice+=2;
		}
	
	
	if (freqArr[1]==1){
		points+=100;
		scoringDice++;
		}
	if (freqArr[1]==2){
		points+=200;
		scoringDice+=2;
		}
	
	
	
	//special scenarios. These override any standard scoring.
	if (arraysEqual(freqArr,[0,1,1,1,1,1,1])){  //123456
		points=runPoints;
		scoringDice=6;
		}

	var pairs=0;  //three pairs	
	for (i=0; i<freqArr.length; i++){
		if (freqArr[i]==2){pairs++}		
	}
	if (pairs==3){
		points=pairsPoints;
		scoringDice=6;
	}
	
    var pyramid=[false,false,false];
    for (i=0; i<freqArr.length; i++){ //pyramid points, which... don't worry about it
		
        if (freqArr[i] ==1){pyramid[0]=true}
        if (freqArr[i] ==2){pyramid[1]=true}
        if (freqArr[i] ==3){pyramid[2]=true}
	}
    
	
    if (pyramid[0] && pyramid[1] && pyramid[2] && points>0){pyramidPoint=true} else{pyramidPoint=false}
    
	return {points:points, scoringDice:scoringDice, pyramidPoint:pyramidPoint};
	
}


var rollDice=function(){
    return(Math.floor(Math.random() * 6) + 1);
}


var randomRoll=function(){
    
     var myRoll=[] //the outcomes of a dice roll

    //var diceToRoll=Math.floor(Math.random() * 6)+1;
     var diceToRoll=6;
    for(var i=0; i<diceToRoll; i++){
        myRoll.push(rollDice());
    }
    
    //myRoll=[1,1,1,2,2,3];
    myRoll.sort((a,b)=>a-b); //for visual asthetics ONLY. Not needed.

    var diceString='';

    for (var i=0; i<myRoll.length; i++){
        diceString+=diceUnicode[myRoll[i]];   
    }

    

    var results=evalPoints(myRoll); //an array representing 

    if (results.scoringDice==myRoll.length){hotDice="HOT DICE! ";}
    else if(results.scoringDice==0){hotDice="BUST-A-RINO! ";}
    else{hotDice="";}
    
    if (results.pyramidPoint==true){hotDice += '△';}
    
    //if (results.pyramidPoint==true){
    console.log(diceString, results.points, " points\t" + results.scoringDice + " dice scored\t", hotDice); 
    //}
    

    
    
}

randomRoll();
setInterval(randomRoll,1000);