export class SignUpPage {
    visit() {
        cy.visit('/sign-up')
    }
    get Button() {
        return cy.get('button').contains('Next')
    }
    getInput(placeholder: string) {
        return cy.get(`input[placeholder="${placeholder}"]`)
    }

    type(placeholder: string, str: string) {
        return this.getInput(placeholder).type(str)
    }
}
