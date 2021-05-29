function UpdateCompanyList() {
    // get all the compani join in db
    let h = new Headers();
    h.append('Content-Type', 'application/json');
    fetch('/todolist/getcompany', {
        method: 'Get',
        headers: h
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })

}
UpdateCompanyList();