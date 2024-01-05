


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
    /*
    if (!key || !value) {
        throw "Key and value are required.";
    }
    const payload = { key, value, token: STORAGE_TOKEN };
    */   
    console.log("Task for Backend"); 
    console.log(JSON.stringify(task)); 
    //console.log(JSON.parse(task)); 

    /*
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
    */
}
