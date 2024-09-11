describe('Auth page testing', () => {
    it('shoud open auth page', () => {
        cy.visit('/')
        cy.get('h1').should('contain', 'Happening now')
        cy.get('h2').should('contain', 'Join Twitter today')
    })

    it('go to sign up page', () => {
        cy.visit('/')
        cy.contains('Sign up with email').click()
        cy.get('h2').should('contain', 'Create an account')
    })
})
