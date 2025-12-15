import { Page } from '@playwright/test';

export class FormLayoutsPage
{
  //
  readonly page: Page

  constructor(page: Page)
  {
    this.page = page
  }

  async submitUsingTheGridForm(email: string, password: string, option: string)
  {
const usingGridForm =
    this.page.locator('nb-card', {hasText: "Using the Grid"})

   await usingGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
   await usingGridForm.getByRole('textbox', {name: 'Password'}).fill(password)

    await usingGridForm.getByRole('radio', {name: option}).click({force: true})

     await usingGridForm.getByRole('button', {name: 'Sign in'}).click()
  }

  /**
   * 
   * @param username - provide firstname lastname
   * @param email - provide email address
   * @param rememberMe - true/false 
   */

  async submitUisngInLineForm(username: string, email: string, rememberMe: boolean)
  {
    const usingInLineForm =
    this.page.locator('nb-card', {hasText: "Inline form"})
    usingInLineForm.getByPlaceholder('Jane Doe').fill(username)
    usingInLineForm.getByRole('textbox', {name: 'Email'}).fill(email)

    if(rememberMe)
    {
      await usingInLineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true})
      await usingInLineForm.getByRole('button', {name: 'Submit'}).click()
    }


  }


}