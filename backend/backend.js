

/* ********************** BEGINN TASKS **************************** */

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

    return fetch(url, { method: 'POST', body: JSON.stringify(task) })
        .then(res => res.json());
}
/* ********************** END TASKS **************************** */
/* ********************** BEGINN CONTACTS **************************** */

/**
 * Loads all contacts from Backened
 * @returns conctacts[]
 */
async function getContactsFromBackend() {
    const url = 'http://127.0.0.1:8000/contacts/';

    const resp = await fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log("Contacts from Backend");
            console.log(res)
            if (res) {
                return res;
            }
            throw `Could not find data.`;
        });
    return resp;
}

/**
 * Creats a new contact
 * @param {JSONString} contact 
 * @returns created contact as JSONString
 */
async function addContactToBackend(contact) {

    const url = 'http://127.0.0.1:8000/contacts/';

    console.log("Contact for Backend");
    console.log(JSON.stringify(contact));

    return await fetch(url, { method: 'POST', body: JSON.stringify(contact) })
        .then(res => res.json());
}


async function deleteContactFromBackend(contactID) {

    const url = 'http://127.0.0.1:8000/contacts/' + contactID['id'] + "/";
    console.log("Delete: " + contactID['id'])

    await fetch(url, {method: 'DELETE'})
        .then(res => {
                console.log(res); 
                return true; 
            }) 
        .catch((error) => {
            console.error(error);
            return false; 
        })
}
/* ********************** END CONTACTS **************************** */
/* ********************** BEGINN AUTH **************************** */


async function loginBackend(email, password) {

    const url = 'http://127.0.0.1:8000/api-token-auth/'
    requestData = {
        "email": email,
        "password": password
    }
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
        .then(res => res.json())
        .then(obj => {
            localStorage.setItem("token", obj.token);
            return obj;
        })
        .catch((error) => {
            localStorage.removeItem("token");
            console.error(error);
        });
}


async function checkAuth() {
    console.log("CHECK AUTH"); 
    const token = localStorage.getItem("token"); 
    if(token != null && token != ""){

    }
    else{
        window.location.href = '/index.html';
    }
    return true;
}
/* ********************** END AUTH **************************** */
