export class Auth {
    getInput(placeholder: string) {
        return cy.get(`input[placeholder="${placeholder}"]`)
    }

    logIn() {
        cy.visit('/log-in')
        this.getInput('Phone number, email address').type('test@test.test')
        this.getInput('Password').type('12121212')
        cy.contains('Log In').click()
    }
}
