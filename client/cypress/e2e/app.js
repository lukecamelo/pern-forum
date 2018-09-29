/* globals cy */

describe('forum app', () => {

  it('can visit the app', () => {
    cy
      .visit('/')
      .getByText('Login')
      .click()
      .getByTestId('username-input')
      .type('rediscover')
      .getByTestId('password-input')
      .type('rere')
      .getByText('Login')
      .click()
  })

})