function activeTypeTaskBar() {
    const btn_type_task_bar = document.getElementById('btn-type-task-bar');
    const type_option       = document.getElementsByClassName('type-options')[0];
    btn_type_task_bar.addEventListener('click', (e) => {
        type_option.classList.toggle('active-type-bar')
    })
}
function checkTypeTaskBarBtnClicked(callback) {
    
    let btn = document.getElementsByClassName('type-options')[0];
    let arr_btn = btn.getElementsByTagName('div');
    for(let i = 0 ; i < 3; i++) {
        arr_btn[i] = arr_btn[i].getElementsByTagName('p')[0];
    }
    for(let i = 0; i < 3; i++) {
        arr_btn[i].addEventListener('click', (e) => {
            for(let j = 0; j < 3; j++) {
                arr_btn[j].classList.remove('active-type-bar-btn');
            }
            arr_btn[i].classList.add('active-type-bar-btn')
            callback(i);
        })
    }
}
function setupSeletonTypeBar() {
    const task_type = document.getElementById('task-type');
    task_type.innerHTML = `
    <div id="btn-type-task-bar"><p>trạng thái</p></div>
    <div class="type-options">
        <div><p>All</p></div>
        <div><p>Đã làm</p></div>
        <div><p>Chưa làm</p></div>
    </div>`;
}
function setupTypeTaskBar(callback) {
    setupSeletonTypeBar();
    activeTypeTaskBar();
    checkTypeTaskBarBtnClicked(callback);
    // checking what king of button was click

}
