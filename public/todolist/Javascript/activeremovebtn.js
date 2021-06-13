function callApiChangeCoditionTask(id, condition) {
  return new Promise(res => {
    // call api
    let url = `/todolist/updatecondition/${id}/${condition}`
    let h = new Headers();
    h.append('Content-Type', 'application/json');
    fetch(url, {
        method: 'POST',
        headers: h,
    }).then(() => {
      res();
    })
})
}
function activeIsDoneanimation(element) {
  // active animation
  element.addEventListener('click', e => {
    let id =  element.parentElement.parentElement.parentElement
            .getElementsByClassName('task-id')[0]
            .innerHTML;
    let isDone = e.target.getElementsByClassName("isDOne-type")[0].innerHTML;
    if(isDone == "1") {
      callApiChangeCoditionTask(id, 0)
      .then(() => {
        let parent = e.target.parentElement;
        parent.innerHTML = `<i class="fas fa-times isDone-btn"> <span class = "isDOne-type" style = "display: none">0</span></i>`;
        let activetemp = parent.getElementsByClassName('isDone-btn')[0];
        activeIsDoneanimation(activetemp);
      })
     
    }
    else if (isDone == "0") {
      callApiChangeCoditionTask(id, 1)
      .then(() => {
        let parent = e.target.parentElement;
        parent.innerHTML = `<i class="fas fa-check isDone-btn"> <span class = "isDOne-type" style = "display: none">1</span></i>`;
        let activetemp = parent.getElementsByClassName('isDone-btn')[0];
        activeIsDoneanimation(activetemp);
      })
     
    }
  })
}
function activeremovebtnintasklist(element) {
  element.addEventListener('click', (e) => {
    let id = e.target.getElementsByClassName('task-id')[0].innerHTML;
    let element_xoa = e.target.parentElement;
    new Promise(res => {
      // call api
      let h = new Headers();
      h.append('Content-Type', 'application/json');
      fetch(`/todolist/deletelist/${id}`, {
          method: 'POST',
          headers: h,
      })  .then(() => {
            res()
          })
     
    })
    .then(() => {
        element_xoa.parentElement.removeChild(element_xoa);
    })
   })
}
function reactiveremovebtn() {
   let x =document.getElementById('list-task').getElementsByClassName('xoa')
   for(let i = 0; i < x.length; i++) {
     activeremovebtnintasklist(x[i])
   }
   let isDonebtns = document.getElementById('list-task').getElementsByClassName('isDone-btn');
   for(let i = 0; i < isDonebtns.length; i++) {
     activeIsDoneanimation(isDonebtns[i]);
   }
}
