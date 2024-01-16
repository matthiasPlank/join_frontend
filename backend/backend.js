/* ********************** BEGINN TASKS **************************** */

/**
 * Gets all Tasks from backend and returns that as json
 * @returns Tasks as JSON Array
 */
async function getTasksFromBackend() {

    const url = 'http://127.0.0.1:8000/tasks/';
    const resp = await fetch(url)
        .then(response => response.json())
        .then(res => {
            if (res) {
                return res;
            }
            throw `Could not find data.`;
        });
    return resp;
}

/**
 * Creates a new task in backend
 * @param {Task} task 
 * @returns Task
 */
async function setTasksToBackend(task) {

    const url = 'http://127.0.0.1:8000/tasks/';
    return fetch(url, { method: 'POST', body: JSON.stringify(task) })
        .then(res => res.json());
}

/**
 * Updates a existing task in backend
 * @param {Task} task 
 * @returns upadatedTask
 */
async function updateTasksToBackend(task) {

    const url = 'http://127.0.0.1:8000/tasks/' + task['id'] + "/";
    return fetch(url, { method: 'PATCH',
                        headers: {'Content-Type': 'application/json'} , 
                        body: JSON.stringify(task) })
        .then(res => res.json());
}

/**
 * Deletes the task with the given ID in backend. 
 * @param {string} taskID 
 */
async function deleteTaskromBackend(taskID) {

    const url = 'http://127.0.0.1:8000/tasks/' + taskID + "/";
   
    await fetch(url, {method: 'DELETE'})
        .then(res => {
                return true; 
            }) 
        .catch((error) => {
            console.error(error);
            return false; 
        })
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

/**
 * Updates a contact in the backend
 * @param {Contact} contact 
 * @returns updatedContact
 */
async function updateContactToBackend(contact) {

    const url = 'http://127.0.0.1:8000/contacts/' + contact['id'] + "/";
    return fetch(url, { method: 'PATCH',
                        headers: {'Content-Type': 'application/json'} , 
                        body: JSON.stringify(contact) })
        .then(res => res.json());
}

/**
 * Deletes the contact with the given ID in backend. 
 * @param {string} contactID 
 */
async function deleteContactFromBackend(contactID) {

    const url = 'http://127.0.0.1:8000/contacts/' + contactID['id'] + "/";
    await fetch(url, {method: 'DELETE'})
        .then(res => { 
                return true; 
            }) 
        .catch((error) => {
            console.error(error);
            return false; 
        })
}
/* ********************** END CONTACTS **************************** */
/* ********************** BEGINN AUTH **************************** */

/**
 * Checks login credential in backend and sets localstroage token.
 */
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
            setLocalStorageLoginItems(obj.token , obj.username , obj.email)
            return obj;
        })
        .catch((error) => {
            removeLocalStorageLoginItems(); 
            console.error(error);
        });
}

/**
 * Register a new user in backend
 * @param {string} email 
 * @param {string} password 
 * @param {string} username 
 */
async function registerBackend(email, password, username) {

    const url = 'http://127.0.0.1:8000/register/'
    requestData = {
        "email": email,
        "password": password, 
        "username": username
    }
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(res => res.json())
        .then(obj => {
            return obj;
        })
        .catch((error) => {
            console.error(error);
        });
}


async function checkAuth() {
    const token = localStorage.getItem("token"); 
    const email = localStorage.getItem("email"); 
    if(token != null && token != ""){

        const url = "http://127.0.0.1:8000/checkToken/";
        requestData = {
            "email": email,
            "token" : token
        }
        await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        })
        .then(async res => {
            console.log("AUTH RESPONSE:"); 
            result = await res.text(); 
            console.log(result); 
            if(result == "True"){
                return true; 
            }
            else{
                window.location.href = '/index.html';
            }
        })
        .catch((error) => {
            console.error(error);
            window.location.href = '/index.html';
        })
      
    }
    else{
        window.location.href = '/index.html';
    }
    return true;
}
/* ********************** END AUTH **************************** */

function setLocalStorageLoginItems( token, username , email){
    localStorage.setItem("token", token);
    localStorage.setItem("username", username); 
    localStorage.setItem('email', email);
}

function removeLocalStorageLoginItems(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
}
