import data from './compiled/1673843628657.docx.json';

// const cssModule = await import('./result.css', {
//     assert: { type: 'css' }
//   });
//   document.adoptedStyleSheets = [cssModule.default];
  

function Score(){
    let suggestions=[];
let score=0;

if(data.objective)
{
    score=score+20;
    
}
else{
    var sug1 = "\n   Write an objective<br><br>";
    suggestions.push(sug1);
    
}
if(data.skills)
{
    score=score+20;
    
}
else{
    var sug2 = "  Write some skills<br><br>";
    suggestions.push(sug2);
    
}
if(data.courses || data.certifications)
{
    score=score+20;
   
}
else{
    var sug3 = "  Mention some courses or certifications<br><br>";
    suggestions.push(sug3);
    
}
if(data.projects)
{
    score=score+20;
    
}
else{
    var sug4 = "  Write an objective<br><br>";
    suggestions.push(sug4);
    
}
if(data.experience)
{
    score=score+20;
   
}
else{
    var sug5 = "  Write some experiences<br><br>";
    suggestions.push(sug5);
}
if(data.cocurricular|| data.hobbies)
{
    score=score+20;

}
else{
    var sug6 = "  Mention some co-curricular activities<br><br>";
    suggestions.push(sug6);
    
}
if(data.interests)
{
    score=score+5;
}
else{
    var sug7 = "  Write some interests<br>";
    suggestions.push(sug7);
}


score = Math.floor((score/115)*100);
//window.alert(suggestions);
document.write('<h2 class="score font">Your Resume score is '+score+"%"+'<br></h2>');
score=0;




let removeComma= () => {

    document.write ('<p class="para font">'+suggestions.join(' ')+'</p>');
    		// using join() method.
}
 removeComma();



suggestions=[];


}

export default Score;