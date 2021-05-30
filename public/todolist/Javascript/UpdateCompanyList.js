
function UpdateCompanyList() {
    const updatecompanyown = (datas) => {
        const company_list = document.getElementById('company-list');
        datas.forEach(Element => {
            let li = document.createElement('li');
            li.innerHTML = Element.Company_name;
            company_list.append(li);
        })
    }
    const updatecompanyjoined = (datas) => {
        const company_joined = document.getElementById('company-joined');
        datas.forEach(element => {
            let li = document.createElement('li');
            li.innerHTML = element.company;
            company_joined.append(li);
        })
    }

    // get all the compani join in db
    let h = new Headers();
    h.append('Content-Type', 'application/json');
    // fetch listcompanyown
    fetch('/todolist/getcompanyown', {
        method: 'Get',
        headers: h
    })
    .then(res => res.json())
    .then(res => {
        updatecompanyown(res)
    })
    // fetch get company
    fetch('/todolist/getcompanyjoined', {
        method: 'Get',
        headers: h
    })
    .then(res => res.json())
    .then(res => {
        updatecompanyjoined(res)
    })
   
}
UpdateCompanyList();