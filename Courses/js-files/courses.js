//opencard function to make the card flip

const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const back = card.querySelector('.card-back');

    // Flip card on click
    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });

  }
);

  //Scrolling behavior for each chapter bar////////
const cardsContainer = document.querySelector('.Chapter-Elements');
let isDown = false;
let startX;
let scrollLeft;

cardsContainer.addEventListener('mousedown', (event) => {
   isDown = true;
   cardsContainer.classList.add('active');
   startX = event.pageX - cardsContainer.offsetLeft;
   scrollLeft = cardsContainer.scrollLeft;
})
//handle all the other mouse cases
cardsContainer.addEventListener('mouseleave' , ()=>{
    isDown = false;
})

cardsContainer.addEventListener('mouseup' , ()=> {
   isDown = false;
})
cardsContainer.addEventListener('mousemove' , (event) =>{
    if(!isDown) return;
    event.preventDefault(); //we tell the browser not to do its default actions , stop i'm handling this manually
    const x = event.pageX - cardsContainer.offsetLeft;
    const fast = (x - startX) * 2; //increase the speed of the scrolling
    cardsContainer.scrollLeft = scrollLeft - fast; 
});
const courses = [
   {
     id: 1,
     name:"ماهي العقيدة",
     videoID :"" ,
     unlocked: true,
   },
   {
     id: 2,
     name:"ماهو التوحيد",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 3,
     name: "القرآن واهميته",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 4,
     name:"نبذة عن السنة واهميتها",
     videoID :"" ,
   unlocked: false,
   },
   {
     id: 5,
     name:"اركان الاسلام الخمسة واركان الايمان",
     videoID :"" ,
    unlocked: false,
   },
   {
     id: 6,
     name:"الاعجاز العلمي في القرآن",
     videoID :"" ,
    unlocked: false,
   },
   {
     id: 7,
     name:"القرآن وتأثيره النفسي",
     videoID :"" ,
    unlocked: false,
  },
   {
     id: 8,
     name:"كيف افهم القرآن؟",
     videoID :"" ,
    unlocked: false,
   },
   {
     id: 9,
     name:"علاقة القرآن بالكتب السماوية الاخرى",
     videoID :"" ,
    unlocked: false,
   },
   {
     id: 10,
     name:"كيف احفظ القرآن",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 11,
     name:"قصة الرسول صلى الله عليه وسلم قبل وبعد البعثة",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 12,
     name:"السنة و اهميتها في الاحكام الشرعية",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 13,
     name:"المذاهب الاربعة والاختلافات في الاحكام",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 14,
     name:"الاحاديث الضعيفة و محاربتها",
     videoID :"" ,
     unlocked: false,
   },
   {
     id: 15,
     name:"المقاصد الشرعية الاخرى - الاجماع/القياس/المصالح المرسلة",
     videoID :"" ,
     unlocked: false,
   },
]
function unlockNextCourse(currentID){
  const next = courses.find(c => c.id === currentID + 1);
  if(next){
     next.unlocked = true;
     localStorage.setItem('courses' , JSON.stringify(courses));
  }
}
const savedData = JSON.parse(localStorage.getItem('courses'));
if(savedData){
   courses.length = 0;
   savedData.forEach(c => courses.push(c));
}

cards.forEach(card => {
  const front = card.querySelector('.card-front');
  const id = parseInt(front.dataset.id); //convert the id from a string to an integer 
  const course = courses.find(c => c.id === id);
  if(!course.unlocked){
    card.classList.add('locked');
    card.style.pointerEvents = 'none';
    front.querySelector(".lock").style.display = "block";
  }
  else {
    card.classList.remove("locked");
    card.style.pointerEvents = 'auto';
    front.querySelector(".lock").style.display = "none";
  }
});

function unlockNextCourse(currentId){
   const next = courses.find(c => c.id == currentId + 1);
  if(next){
    next.unlocked = true;
  localStorage.setItem('courses' , JSON.stringify(courses));
}
}

courses.forEach(card =>{
  const done = localStorage.getItem("courseUnlocked");
  if(done == "true"){
     unlockNextCourse(card.id);
  }
});