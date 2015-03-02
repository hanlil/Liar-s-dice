function copy(string){
	return string;
}

function is_bid_correct(previous_string_bid, string_bid){
	if(string_bid=="liar"){
		return true;
	}
	var bid = convert_from_string_to_int_bid(string_bid);
	var previous_bid = convert_from_string_to_int_bid(previous_string_bid);
	if((bid[0]>previous_bid[0] && bid[1]>=previous_bid[1]) || (bid[0]>=previous_bid[0] && bid[1]>previous_bid[1])){
		return true;
	}
	else return false;
}

function roll_dices(){
	dices = new Array();
	for (var i = 0; i <5; i++) {
		dices[i] = Math.floor((Math.random() * 6) + 1);
	}
	return dices;
}

function convert_from_string_to_int_bid(string_bid){
	var string_to_int = new Array();
	string_to_int["zero"]=0;
	string_to_int["zeros"]=0;
	string_to_int["one"]=1;
	string_to_int["ones"]=1;
	string_to_int["two"]=2;
	string_to_int["twos"]=2;
	string_to_int["three"]=3;
	string_to_int["threes"]=3;
	string_to_int["four"]=4;
	string_to_int["fours"]=4;
	string_to_int["five"]=5;
	string_to_int["fives"]=5;
	string_to_int["six"]=6;
	string_to_int["sixes"]=6;
	string_to_int["seven"]=7;
	string_to_int["eight"]=8;
	string_to_int["nine"]=9;
	string_to_int["ten"]=10;
	string_to_int["eleven"]=11;
	string_to_int["twelve"]=12;
	string_to_int["thirteen"]=13;
	string_to_int["fourteen"]=14;
	string_to_int["fifteen"]=15;
	string_to_int["liar"]=0;
	split_bid = string_bid.split(" ");
	return [string_to_int[split_bid[0]],string_to_int[split_bid[1]]];
}

function convert_from_int_to_string_bid(int_bid){
	var int_to_string = ["liar","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen"];
	var count = int_to_string[int_bid[0]];
	var face = int_to_string[int_bid[1]];
	if(int_bid[0]>1){
		if(int_bid[1]==6){
			face+="es";
		}
		else{
			face+="s";
		}
	}
	return count+" "+face;
}

function convert_from_string_to_int_reveal(string_reveal){
	var string_to_int = new Array();
	string_to_int["one"]=1;
	string_to_int["ones"]=1;
	string_to_int["two"]=2;
	string_to_int["twos"]=2;
	string_to_int["three"]=3;
	string_to_int["threes"]=3;
	string_to_int["four"]=4;
	string_to_int["fours"]=4;
	string_to_int["five"]=5;
	string_to_int["fives"]=5;
	string_to_int["six"]=6;
	string_to_int["sixes"]=6;
	string_to_int["seven"]=7;
	string_to_int["eight"]=8;
	string_to_int["nine"]=9;
	string_to_int["ten"]=10;
	string_to_int["eleven"]=11;
	string_to_int["twelve"]=12;
	string_to_int["thirteen"]=13;
	string_to_int["fourteen"]=14;
	string_to_int["fifteen"]=15;
	string_to_int["liar"]=0;
	split_reveal = string_reveal.split(" ");
	var int_reveal = new Array();
	for (var i=0; i<5; i++){
		int_reveal[i]=string_to_int[split_reveal[i]];
	};
	return int_reveal;
}

function probability_global(count,face,dices){
	var n = 0;
	var prob = 0;
	for(var i = 0; i<5; i++){
		if(face==dices[i]){
			n++;
		};
	};
	new_count = count - n;
	if(new_count <= 0){
		prob = 1;
	}
	else{
		prob = probability(new_count,10);
	};

        return prob;
}


function probability(k,n){
	proba = 0;
	for (var i = k; i < n; i++) {
		proba += binomial(i,n);
	};
	return proba;
}

function binomial(k,n){
	var n_factorial = 1;
	var k_factorial = 1;
	var nminusk_factorial = 1;
	for (var i = 1; i <= n; i++) {
		n_factorial = n_factorial*i;
	};
	for (var i = 1; i <= k; i++) {
		k_factorial = k_factorial*i;
	};
	for (var i = 1; i <= n-k; i++) {
		nminusk_factorial = nminusk_factorial*i;
	};
	return n_factorial/(k_factorial*nminusk_factorial)*Math.pow(1.0/6,k)*Math.pow(5.0/6,n-k);
}



function AI1_int(previous_bid, AI_1_dices){
	var threshold = 0.3;
	var prob = probability_global(previous_bid[0]+1,previous_bid[1],AI_1_dices);
	var max_prob = 0;
	var max_face = 0;
	var pause = 0;
	var prob_higher = probability_global(previous_bid[0]+2,previous_bid[1],AI_1_dices);
	if(prob_higher == 1){
		pause = 1;
	}
	if(prob != 1){
		pause = 1;
	}
	if(prob >= threshold){
		return [previous_bid[0]+1,previous_bid[1],pause];
	}
	else{
		pause = 0;
		for(var i=previous_bid[1]+1; i<7;i++){
			prob = probability_global(previous_bid[0],i,AI_1_dices);
			if(prob>max_prob){
				max_face = i;
				max_prob = prob;
			};
		};
	};
	if(max_prob != 1){
		pause = 1;
	}
	if(max_prob >= threshold){
		return [previous_bid[0],max_face,pause];
	}
	else {
		return [0,0,pause];
	};
}

function AI1(string_bid, AI_1_dices,bool_pause){
	if(!bool_pause){
		var previous_bid = convert_from_string_to_int_bid(string_bid);
		next_bid = AI1_int(previous_bid, AI_1_dices);
		if(next_bid[0]==0){
			return "liar";
		}
		else{
			return "n"+convert_from_int_to_string_bid(next_bid);
		};
	}
	else{
		var previous_bid = convert_from_string_to_int_bid(string_bid);
		next_bid = AI1_int(previous_bid, AI_1_dices);
		if(next_bid[0]==0){
			return "liar";
		}
		else{
			if(next_bid[2]){
				return "p"+convert_from_int_to_string_bid_pause(next_bid);
			}
			else{
				return "n"+convert_from_int_to_string_bid_pause(next_bid);
			}
		};
	}
}
function AI2_int(previous_bid, AI_2_dices){
	var threshold = 0.2;
	var prob = probability_global(previous_bid[0]+1,previous_bid[1],AI_2_dices);
	var max_prob = 0;
	var max_face = 0;
	var pause = false;
	var prob_higher = probability_global(previous_bid[0]+2,previous_bid[1],AI_2_dices);
	if(prob_higher == 1){
		pause = true;
	}
	if(prob != 1){
		pause = true;
	}
	if(prob >= threshold){
		return [previous_bid[0]+1,previous_bid[1],pause];
	}
	else{
		pause = false;
		for(var i=previous_bid[1]+1; i<7;i++){
			prob = probability_global(previous_bid[0],i,AI_2_dices);
			if(prob>max_prob){
				max_face = i;
				max_prob = prob;
			};
		};
	};
	if(max_prob != 1){
		pause = true;
	}
	if(max_prob >= threshold){
		return [previous_bid[0],max_face,pause];
	}
	else {
		return [0,0,pause];
	};
}

function AI2(string_bid, AI_2_dices,bool_pause){
	if(!bool_pause){
		var previous_bid = convert_from_string_to_int_bid(string_bid);
		next_bid = AI2_int(previous_bid, AI_2_dices);
		if(next_bid[0]==0){
			return "liar";
		}
		else{
			return "n"+convert_from_int_to_string_bid(next_bid);
		};
	}
	else{
		var previous_bid = convert_from_string_to_int_bid(string_bid);
		next_bid = AI2_int(previous_bid, AI_2_dices);
		if(next_bid[0]==0){
			return "liar";
		}
		else{
			if(next_bid[2]){
				return "p"+convert_from_int_to_string_bid_pause(next_bid);
			}
			else{
				return "n"+convert_from_int_to_string_bid_pause(next_bid);
			}
		};
	}
}


function winner(bid_string, user_dices_string, AI_1_dices, AI_2_dices){
	previous_bid = convert_from_string_to_int_bid(bid_string);
	user_dices = convert_from_string_to_int_reveal(user_dices_string);
	var count = 0;
	for(var i = 0; i<5; i++){
		if(AI_1_dices[i]==previous_bid[1]){
			count++;
		};
		if(AI_2_dices[i]==previous_bid[1]){
			count++;
		};
		if(user_dices[i]==previous_bid[1]){
			count++;
		};
	};
	if (count >= previous_bid[0]){
		return true;
	}
	else{ return false;};
}
