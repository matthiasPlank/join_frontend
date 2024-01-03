


async function getTasksFromBackend() {

    const url = 'http://127.0.0.1:8000/tasks/';
    const resp = await fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if (res.data) { 
                return res.data.value;
            } 
            throw `Could not find data.`;
    });
    //const resp = await fetch(url)
    console.log(resp);

    return "Test";
}
