const formSubmit = document.querySelector('.form_processor');
const messageEl = document.querySelector('.message');
const pageEl = document.querySelectorAll('.page');

let token = localStorage.getItem("authToken");

if (!token) {
    showPage("auth");
} else {
    showPage("main");
}

const callbacks = {
    authLogin: async (authData) => {
        const result = await postData('http://localhost:4000/auth', authData);

        if (result.status === "OK") {
            showPage("main");
            localStorage.setItem("authToken", result.token);
            token = result.token;
        }
    }
}


formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.getAttribute('name');

    const myFormData = new FormData(event.target);
    const object = {};
    myFormData.forEach((value, key) => object[key] = value);

    if (callbacks[name]) {
        callbacks[name](object);
    }
})

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            'token': token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const resp = await response.json();

    if (resp.status === "ERROR") {
        showMessage(resp.message, resp.status);
    }

    return resp;
}

function showPage(pageNam) {
    for (const page of pageEl) {
        page.style.display = "none";
    }

    document.querySelector(`#${pageNam}`).style.display = "flex";
}

function showMessage(message, status) {
    messageEl.classList.add('show');
    messageEl.innerHTML = message;
    setTimeout(() => {
        messageEl.innerHTML = '';
        messageEl.classList.remove('show');
    }, 3000);
}