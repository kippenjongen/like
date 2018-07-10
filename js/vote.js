/*
MIT License

Copyright (c) 2018 Kieran Houtgraaf

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function vote(vt, main){
	
	// 	Variables: 
	// 	vt = "yes" or "no", wether you vote or not
	// 	main = "up" or "down", wether you vote up or down
	// 	other = "down" or "up", the oposite of main
	var other; 
			
	// 	make other the oposite of main
	if(main == "up"){
		other = "down";
	} else if(main == "down"){
		other = "up";
	}

	// 	start the ajax call
	$.ajax({
			// 	call upvote.php or downvote.php with vt as argument (vote or just get)
			url:"php/" + main + "vote.php", 
		    type: "POST", 
		    data: {vt: vt},
		   	success:function(result){
			
				// 	startM = position of "m" in result if it exists
				var startM;		   		

				// 	Does result include "m"? if so, do this
				if(result.includes("m")){

					//	startM is now the position of "m" in result
					startM = result.search("m");

					//	startM + 1 = the start of result after "m", so the votes that were no voted for
					//  and set that as the votes for other
					document.getElementById(other).innerHTML = result.slice(startM + 1);

					//	0 = start of result and starM = the end of the votes that you voted for
					// 	then set that as the votes for main
					document.getElementById(main).innerHTML = result.slice(0, startM);
					 
				} else {
					//	if result doesnt include "m", set main as result
					document.getElementById(main).innerHTML = result;
				}
	
				// if it was vote and not just get, set the button for main to "Voted!"
				if(vt == "yes"){
					document.getElementById(main + "v").innerHTML = "Voted!";
				}
				
		    }
		});
}

//	Load votes without voting

$(document).ready(function() {
	vote("no", "up");
	vote("no", "down");

});
