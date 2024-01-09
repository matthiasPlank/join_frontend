


async function getTasksFromBackend() {

    const url = 'http://127.0.0.1:8000/tasks/';
    const resp = await fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if (res) { 
                return res;
            } 
            throw `Could not find data.`;
    });
    return resp;
}

async function setTasksToBackend(task) {
   

    const url = 'http://127.0.0.1:8000/tasks/';

    console.log("Task for Backend"); 
    console.log(JSON.stringify(task));

    return fetch(url, { method: 'POST', body: JSON.stringify(task)})
    .then(res => res.json());
}


async function getContactsFromBackend(){
    return '[{"id":"1","firstName":"Matthias","lastName":"Plank","email":"mathias.plank@gmx.at","tel":"+4366412345678","bgIconColor":"#0faabb"},{"id":"2","firstName":"Anton","lastName":"Mayer","email":"anton.mayer@gmx.com","tel":"+4366412345678","bgIconColor":"#7f3dc2"},{"id":"3","firstName":"Benedikt","lastName":"Ziegler","email":"benedikt.ziegler@gmail.de","tel":"+4366412345678","bgIconColor":"#45e3a8"},{"id":"4","firstName":"Anja","lastName":"Schulz","email":"anja.schulz@gmail.com","tel":"+4366412345678","bgIconColor":"#08f9d4"},{"id":"5","firstName":"John","lastName":"Doe","email":"john.doe@example.com","tel":"+1234567890","bgIconColor":"#9c7b1e"},{"id":"6","firstName":"Jane","lastName":"Smith","email":"jane.smith@example.com","tel":"+1234567890","bgIconColor":"#f75c82"},{"id":"7","firstName":"David","lastName":"Johnson","email":"david.johnson@example.com","tel":"+1234567890","bgIconColor":"#5ae8c1"}]'
}
