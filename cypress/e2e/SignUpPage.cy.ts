import { SignUpPage } from '../page_objects/SignUpPage'

describe('SignUp page testing', () => {
    const signUpPage = new SignUpPage()

    it('shoud open sign up page', () => {
        signUpPage.visit()
        cy.get('h2').should('contain', 'Create an account')
    })

    it('type something in inputs', () => {
        signUpPage.visit()
        signUpPage.type('Name', 'darya')
        signUpPage.getInput('Name').should('have.value', 'darya')

        signUpPage.type('Phone Number', 'wrong data')
        cy.contains('Phone number must match the +375 XX XXX XX XX')

        signUpPage.type('Email', 'wrong data')
        cy.contains('email must be a valid email')

        signUpPage.type('Password', '11')
        cy.contains('Password must be at least 8 characters')
        signUpPage.type('Password', '12121212')
        cy.contains('Password must be at least 8 characters').should('not.exist')
        cy.contains('1112121212').should('not.exist')
    })

    it('failed registration', () => {
        signUpPage.visit()
        signUpPage.type('Name', 'darya')
        signUpPage.type('Phone Number', '+375111111111')
        signUpPage.type('Email', 'test@test.test')
        signUpPage.type('Password', '12121212')

        cy.getByDataCy('dropdown').should('have.length', 3)

        cy.contains('Month').click()
        cy.contains('January').click()

        cy.contains('Day').click()
        cy.contains('31').click()
        cy.contains('Year').click()
        cy.contains('2020').click()

        signUpPage.button.click()
        cy.contains('Firebase: Error (auth/email-already-in-use).')
    })
})
