import { Auth } from '../page_objects/Auth'
import { HomePage } from '../page_objects/HomePage'

const UID = 'zE2nToRtKZaqPMDp18Wj3o1yVBD2'

describe('Home page testing', () => {
    const homePage = new HomePage()
    const auth = new Auth()

    beforeEach(() => {
        auth.logIn()
        cy.wait(3000)
    })

    it('homePage', () => {
        homePage.visit()
        cy.contains('test tweet')
    })

    it('profile', () => {
        cy.visit(`http://localhost:5173/profile/${UID}`)
        cy.wait(3000)
        cy.contains(UID)
        cy.contains('Edit Profile').click()
        cy.contains(UID)
        cy.contains('Edit Profile')
    })

    it('recomendations', () => {
        homePage.visit()
        cy.contains(/Show more/).click()
        cy.url().should('include', '/recomendations')
        cy.contains('Follow').click()
        cy.contains('Unfollow').should('exist')
    })

    it('search', () => {
        homePage.visit()
        auth.getInput('Search tweets').type('test')
        cy.getByDataCy('show-more-search').click()
        cy.url().should('include', '/search-tweets')
        cy.contains('test tweet')
    })

    it('logout', () => {
        homePage.visit()
        cy.url().should('include', '/home')
        cy.contains('LogOut').click()
        cy.url().should('include', '/')
        cy.contains('Join Twitter today')
    })

    it('not found', () => {
        homePage.visit()
        cy.contains('Messages').click()
        cy.url().should('include', '/messages')
        cy.contains('404')
    })
})
