const dp = (json, isAppen = true) => {
    let icon;
    if(json.isDone) {
        icon = `<i class="fas fa-check isDone-btn"> <span class = "isDOne-type" style = "display: none">${json.isDone}</span></i>`
    }
    else {
        icon = `<i class="fas fa-times isDone-btn"> <span class = "isDOne-type" style = "display: none">${json.isDone}</span></i>`
    }
    const list_task = document.getElementById('list-task');
    let btn_part;
    let style = `
    background-color: black;
    padding: 5px;
    border-radious: 5px;
    `
    if(json.isDone) {
        btn_part = `
            <div class = "check-box-active">D</div>
        `
    }
    else {
        btn_part = `
        <div>D</div>
    `
    }
    let data = 
    `
    <div class = "task">
        <div class = "task-content">
            <p>${json.content}</p>
            <div class = "task-isDone">
            ${icon}
            </div>
           
        </div>
        <div>
            <div class = "task-date">${json.date}</div>
            <div class = "task-time">${json.time}</div>
        </div>
        <div class = "xoa" style = "${style}">Xóa <span style = "display: none;" class = "task-id">${json.id}</span> </div>
    </div>
    `;
    let x = list_task.innerHTML;
    if(isAppen)
    list_task.innerHTML= x + data;
    else 
    list_task.innerHTML= data + x;
}
const SetupDateSubmit = date => {
    console.log(date)
    var task_submit = document.getElementById('submit-task');
    // var task_submit_content = document.getElementById('task_submit_content');
    task_submit.addEventListener('submit', (e) => {
        e.preventDefault();
        if(e.target.task_content.value.length === 0)
        {
            return;
        }
        let formdata = new FormData(task_submit);
        let json = convertFDtoJSON(formdata);
        json = JSON.stringify(json);
        const xhr = new XMLHttpRequest();
        let url = `/todolist/addbycondition/${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            new Promise(res => {
                let data = JSON.parse(xhr.response);
                dp(data, false);
                e.target.task_content.value = '';
                res();
            }) 
            .then (() => {
                // let x =document.getElementById('list-task').getElementsByClassName('xoa');
                reactiveremovebtn()
            })
           
            // active button in veryfrist task

        }
        xhr.send(json);
    })
    function convertFDtoJSON(fd) {
        let json = {};
        for(let key of fd.keys()){
           json[key] = fd.get(key);
        }
        return json;
    }
}
function getTask() {
    var count_task = 0;
    const list_task = document.getElementById('list-task');
    // display task to browser
    // function to get task
    const gettask = (start, end) => {
        count_task = count_task + end - start + 1;
        let json = {};
        json.start = start;
        json.end   =  end;
        let h = new Headers();
        h.append('Content-Type', 'application/json');
        fetch('/todolist/gettask', {
            method: 'POST',
            headers: h,
            body: JSON.stringify(json)
        })  .then(res => res.json())
            .then(res => {
                res.forEach(element => {
                    dp(element);
                });
              
            })
            .then(() => {
                reactiveremovebtn()
            })
    }
    document.addEventListener('DOMContentLoaded', function() {
        gettask(1,10);   
    }, false);
    var task_submit = document.getElementById('submit-task');
    // var task_submit_content = document.getElementById('task_submit_content');
    task_submit.addEventListener('submit', (e) => {
        e.preventDefault();
        if(e.target.task_content.value.length === 0)
        {
            return;
        }
        let formdata = new FormData(task_submit);
        let json = convertFDtoJSON(formdata);
        json = JSON.stringify(json);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/todolist/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            new Promise(res => {
                let data = JSON.parse(xhr.response);
                dp(data, false);
                e.target.task_content.value = '';
                res();
            }) 
            .then (() => {
                // let x =document.getElementById('list-task').getElementsByClassName('xoa');
                reactiveremovebtn()
            })
           
            // active button in veryfrist task

        }
        xhr.send(json);
    })
    function convertFDtoJSON(fd) {
        let json = {};
        for(let key of fd.keys()){
           json[key] = fd.get(key);
        }
        return json;
    }
}
getTask();
