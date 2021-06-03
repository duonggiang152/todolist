let chose_day_globle =  new Date();
function updateMonthTittle(date) {
   calendarMonth(date)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "Decomber"
    ]
    const days = [
        "SU",
        "MO",
        "TU",
        "WE",
        "TU",
        "FR",
        "SA"
    ];
    let outputday   = days[date.getDay()];
    let outputMonth = months[date.getMonth()];
    let outputdate  = date.getDate();
    let outputYear  = date.getFullYear();
    let output = `
     <h1>${outputMonth}</h1>
     <p>${outputday}, ${outputMonth} ${outputdate} ${outputYear} </p>
     <div id="curent-month" class="curent-month"></div>
    `;
    document.getElementById('calendar-tittle').innerHTML = '';
    document.getElementById('calendar-tittle').innerHTML = output;
}
function UpdateCalender(today, callback) {
    let days = new Date(today.getFullYear(),today.getMonth() + 1,0).getDate();
    const days_element = document.getElementsByClassName('days')[0];
    // show day in month
    days_element.innerHTML = '';
    for(let i =  1; i <= days; i++) {
        let div = document.createElement('div');
        div.classList.add('days');
        div.classList.add('show-day');
        div.innerHTML = `<p>${i}</p>`;
        days_element.append(div);
    }
    // adding previousdays
    // -----------------------
    //get day of today
    let f_date_in_month = new Date(today.getFullYear(),today.getMonth() ,1).getDay();
    let pre_days;
    if(today.getMonth() !== 0)
    pre_days = new Date(today.getFullYear(),today.getMonth() - 1,0).getDate();
    else 
    pre_days = new Date(today.getFullYear() - 1,11,0).getDate();
    for(let i = 0; i < f_date_in_month; i++) {
        let div = document.createElement('div');
        div.classList.add('fade_day');
        div.classList.add('pre_days');
        div.innerHTML = `<p>${pre_days--}</p>`;
        days_element.prepend(div);
    }
    // -------------------------------

    // adding nextdays 
    // -----------------
    let last_date_of_month = new Date(today.getFullYear(),today.getMonth() + 1,0).getDay();
    let z = 1;
    for(let i = last_date_of_month; i <= 6; i++) {
        let div = document.createElement('div');
        div.classList.add('fade_day');
        div.classList.add('next_days');
        div.innerHTML = `<p>${z++}</p>`;
        days_element.append(div);
    }
    // -----------------------------
    // update month tittle
    // ------------------------
   
    // -----------------------------
    // add event linstener for date
  
    let arr_day = document.getElementsByClassName('show-day');
    for(let i = 0 ; i < arr_day.length; i++) {
        arr_day[i].addEventListener('click', (e) => {
            for(let j = 0 ; j < arr_day.length; j++) {
                arr_day[j].classList.remove('chose_day')
            }
            arr_day[i].classList.add('chose_day');
            chose_day_globle = new Date(today.getFullYear(),today.getMonth(), i + 1);
           callback(chose_day_globle);
        })
    }
}
function addPrevioustMonthEvent(month) {
    if(month.getMonth() === 0) {
        return new Date(month.getFullYear() - 1, 11)
    }
    else {
        return new Date(month.getFullYear(), month.getMonth() - 1)
    }
}
function addNextMonthEvent(month) {

    if(month.getMonth() === 11) {
        return new Date(month.getFullYear() +1 , 0)
    }
    else {
        return new Date(month.getFullYear(), month.getMonth() +1)
    }
}
function calendarMonth(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "Decomber"
    ]
    let data = `<p>Lịch: ${months[month.getMonth()]}/${month.getFullYear()}<p>`;
    const curent_month = document.getElementById('curent-month');
    curent_month.innerHTML = data;
}
function setupcalendar(callback) { 
    var today = new Date();
    var choosedate = today;
    updateMonthTittle(today)
    calendarMonth(today)
    var date  = new Date();
    UpdateCalender(date, callback);
    //get previoust element
    const month  = document.getElementsByClassName('month')[0];
    const prebtn = month.getElementsByTagName('i')[0];
    prebtn.addEventListener('click',(e) => {
        date = addPrevioustMonthEvent(date);
        UpdateCalender(date, callback);
        calendarMonth(date)
        if( date.getMonth()    === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) 
            {

            let today_date =today.getDate();
            let today_element = document.getElementsByClassName('days')[today_date];
            today_element.classList.add('days_today');
            }
        
    } )
    const nexbtn =  month.getElementsByTagName('i')[1];
    nexbtn.addEventListener('click', (e) => {
        date = addNextMonthEvent(date)
        UpdateCalender(date, callback)
        calendarMonth(date)
     
        if( date.getMonth()    === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) 
        {

        let today_date =today.getDate();
        let today_element = document.getElementsByClassName('days')[today_date];
        today_element.classList.add('days_today');
        }
    })
    if( date.getMonth()    === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) 
    {

    let today_date =today.getDate();
    let today_element = document.getElementsByClassName('days')[today_date];
    today_element.classList.add('days_today');
    }
    // get today

    // previoust month 
}
function setupSkeletoncalendar() {
    const date_picker = document.getElementsByClassName('date-picker');
    for(let i = 0; i < date_picker.length; i++) {
        date_picker[i].innerHTML = `
        <div class="month">
                <i class="fas fa-chevron-left"></i>
                <div id="calendar-tittle" class="date">
                    <h1></h1>
                    <p></p>
                    <div id="curent-month" class="curent-month"></div>
                </div>
                <i class="fas fa-chevron-right"></i>
        </div>
        <div class="weekdays">
            <div><p>SU</p></div>
            <div><p>MO</p></div>
            <div><p>TU</p></div>
            <div><p>WE</p></div>
            <div><p>TH</p></div>
            <div><p>FR</p></div>
            <div><p>SA</p></div>
        </div>
        <div class="days">
        </div>`;
    }
}
setupSkeletoncalendar();