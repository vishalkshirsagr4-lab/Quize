import { questions } from "./qns.js";
import { alpha } from "./qns.js";
        
         let color=0;
         let textanswer='';
         let score = JSON.parse(localStorage.getItem("score")) || {
                            index: 0,
                            lvl: 1  };
        document.querySelector(".lvl").textContent=score.lvl;

    function Trans() {

        let opt=document.querySelectorAll(".opt");
        let ans=document.querySelectorAll(".ans");

        opt.forEach((opt) => {
           opt.addEventListener("click", () => {
           let letter = opt.dataset.alpha;
        for(let i = 0; i <= color; i++) {
            ans[i].classList.add("add-color");
        }
         ans[color].textContent = letter;
         textanswer += ans[color].textContent;

        color++;
      
        if(color >= ans.length) {
            console.log(textanswer);
            console.log(Win(textanswer));
            if(Win(textanswer)) {
                 score.index++;
                 boxhtml='';
                 html='';
                 textanswer='';
                 score.lvl++;
                 document.querySelector(".lvl").textContent=score.lvl;
                 color=0;
                 document.querySelector(".qns").classList.add("left");
                 document.querySelector(".cole").classList.add("right");
                 qns();
                 setTimeout(()=>{ 
                    document.querySelector(".qns").classList.remove("left");
                    document.querySelector(".cole").classList.remove("right");
                  },1000);
                  localStorage.setItem("score", JSON.stringify(score));
            } else {
                document.querySelector(".answers").classList.add("error");
                setTimeout(()=>{
                   ans.forEach((ans)=>{ans.classList.remove("add-color")});
                   color = 0;
                },600);
               setTimeout(()=>{document.querySelector(".answers").classList.remove("error"); ans.forEach((ans)=>{ ans.textContent=''; }) },800);
                textanswer='';
           }
        } 

      });
  });
}
   
    function Win(win) {
      return  win = questions[score.index].answer == textanswer ? true : false;
    }


     let num = [0,1,2,3,4,5,6,7,8,9,10,11];

     let arr = [0,1,2,3,4,5,6,7,8,9,10,11];

     function shuffle() {
         arr.sort(() => Math.random() - 0.5);
         console.log(arr);
     }

   let html="";

function qns(){
      shuffle();
      arr.forEach((number)=>{
        document.querySelector(".tech-qns").textContent=questions[score.index].qns;
        let random=alpha[Math.floor(Math.random()*26)];
        let div=`
        <div class="opt" data-alpha=${
             number < questions[score.index].answer.length  ?
             questions[score.index].answer[number] : 
             random
        }> 
        ${number < questions[score.index].answer.length  ?
             questions[score.index].answer[number] : 
             random }
         </div>
        `;
        html+=div;
      });
      document.querySelector(".cole").innerHTML=html;
      answer();
      Trans();
}

  let boxhtml="";

  function answer() {
    document.querySelector(".answers").style.gridTemplateColumns =`repeat(${questions[score.index].answer.length}, auto))`;
    document.querySelector(".tech-qns").textContent=questions[score.index].qns;
    questions[score.index].answer.split("").forEach((box)=>{
        let div=`
        <div class="ans">  </div>
        `
        boxhtml+=div;
    });
    document.querySelector(".answers").innerHTML=boxhtml;
  }


  qns();

  document.querySelector(".hint-open").addEventListener("click",()=>{
        document.querySelector(".hint").style.display="flex";
  });

  document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".hint").style.display="none";
  });