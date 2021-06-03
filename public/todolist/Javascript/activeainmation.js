function activeAnimation() {
    const show_company_btn = document.getElementById('company-show-btn');
    const company_list     = document.getElementById('Companies_List');

    show_company_btn.addEventListener('click', e => {
        company_list.classList.toggle('my-company-display');
    })
    const show_company_btn_2 = document.getElementById('company-show-btn-2');
    const company_joined_list     = document.getElementById('Companies_Joined_List');
    show_company_btn_2.addEventListener('click', e => {
        company_joined_list.classList.toggle('my-company-display');
    })
}
function activechoseyourtask() {
    const Yourtask = document.getElementById('your-task');
    Yourtask.classList.add('on-action-bar');

}
activechoseyourtask()
activeAnimation();