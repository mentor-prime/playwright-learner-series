function accessApplication() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step01# User has access application");
            resolve();
        }, 2000);
    });
}

function enterCredentials() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step02# user has entered credentials");
            resolve();
        }, 1000);
    });
}

function clickLoginButton() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("step03# user has clicked on login button");
            resolve();
        }, 1000);
    });
}

function performLogin() {
    Promise.all([accessApplication(), enterCredentials(), clickLoginButton()]).then(() => {
        console.log("Login completed ... ");
    });
}

performLogin();