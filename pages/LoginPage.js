const LoginObjects = require('../page-objects/LoginObjects');
const {expect} = require("@playwright/test");
const HeaderObjects = require("../page-objects/HeaderObjects");
const {Users} = require("../test-data/Users");

class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async verifyFieldsAtLoginPage(){
        await expect(this.page.locator(LoginObjects.loginForm.field_username)).toBeVisible();
        await expect(this.page.locator(LoginObjects.loginForm.field_password)).toBeVisible();
        await expect(this.page.locator(LoginObjects.loginForm.button_login)).toBeVisible();
    }

    async fillCredentials() {
        await this.page.locator(LoginObjects.loginForm.field_username).fill(Users.username);
        await this.page.locator(LoginObjects.loginForm.field_password).fill(Users.password);
    }

    async clickLoginButton() {
        await this.page.locator(LoginObjects.loginForm.button_login).click();
    }

}

module.exports = { LoginPage };