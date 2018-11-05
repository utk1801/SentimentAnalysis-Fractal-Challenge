
var data_qa;
var ans;
var score=0;
function preload() {
	data_qa=loadJSON("qa_Beauty.json");
	// var reviews=loadJSON('reviews_Beauty_5.json');
	afinn=loadJSON("afinn111.json");
}

function setup() {
  noCanvas();
  console.log(data_qa);
  var qa={};
  createP('Question:');
  var q=createSelect('').size(500,20);
  for (var i=0;i<data_qa.ques.length;i++){
  		var ques=data_qa.ques[i].question;
  		q.option(ques);
		qa[ques]=data_qa.ques[i];	
		// console.log(qa);	
  }


 var button = createButton('submit');
  button.mousePressed(getAns);

	head1=createP('');
	resultP = createP('');
	var sent = createButton('Do Sentiment Analysis');
	sent.hide();
	head2=createP('');
	var scorePar = createP('');
    var comp = createP('');
    var wordlist = createP('');



function getAns(){
	var selected=q.value();
	ans=qa[selected].answer;
	head1.html('Answer:').style("font-weight","bold");
	resultP.html(ans);
	sent.show();
	scorePar.html('');comp.html('');wordlist.html('');
	sent.mousePressed(analysis);
	head2.html('Reviews:').style("font-weight","bold");
	}

	function analysis(){
		words=ans.split(/\W/);
		console.log(words);
		var scoredWords=[];
		var totalScore=0;
		for( var i=0;i<words.length;i++){
			var word=words[i].toLowerCase();
			if(afinn.hasOwnProperty(word)){
				totalScore+=Number(afinn[word]);
				scoredWords.push(word + ': ' + afinn[word]);
			}
		}

	    scorePar.html('score: ' + totalScore);
	    comp.html('comparative: ' + totalScore / words.length);
	    wordlist.html(scoredWords);
	}
}
  
  
