/* globals cy */

describe('forum app', () => {

  it('can visit the app', () => {
    cy
      .visit('/')
      .getByText('Login')
      .click()
      .getByLabelText('usernameInput')
      .type('rediscover')
      .getByLabelText('passwordInput')
      .type('rere')
      .getByText('Login')
      .click()
  })

})