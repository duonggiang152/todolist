function getTask() {
    var count_task = 0;
    const list_task = document.getElementById('list-task');
    // display task to browser
    const dp = (json, isAppen = true) => {
        let btn_part;
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
            <div class = "task-isDone" id = "task-done-${count_task++}">
            ${btn_part}
            </div>
            </div>
            <div>
                <div class = "task-date">${json.date}</div>
                <div class = "task-time">${json.time}</div>
              
            </div>
        </div>
        `;
        let x = list_task.innerHTML;
        if(isAppen)
        list_task.innerHTML= x + data;
        else 
        list_task.innerHTML= data + x;
    }
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
        }).then(res => res.json())
            .then(res => {
                res.forEach(element => {
                    dp(element);
                });
              
            })
    }
    document.addEventListener('DOMContentLoaded', function() {
        gettask(1,10);   
    }, false);
    var task_submit = document.getElementById('submit-task');
    var task_submit_content = document.getElementById('task_submit_content');
    task_submit.addEventListener('submit', (e) => {
        e.preventDefault();
        let formdata = new FormData(task_submit);
        let json = convertFDtoJSON(formdata);
        json = JSON.stringify(json);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/todolist/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          
            let data = JSON.parse(xhr.response)
            dp(data, false)
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