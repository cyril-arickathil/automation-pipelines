import {test, expect} from '@playwright/test';
test.beforeEach(async ({page}) =>
{
  //await page.goto('http://www.uitestingplayground.com/ajax')

  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX Request').click()

})


test('timeouts ', async ({page}) =>
{
  const successButton =
  page.locator('.bg-success')

  //await successButton.click();
await successButton.waitFor({state: 'attached'})
  const text = await successButton.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')

})


test('timeouts - alternate condition', async ({page}) =>
{
  const successButton =
  page.locator('.bg-success')

// wait for element
  //await page.waitForSelector('.bg-success') //wait for condition
  //await successButton.click();

  //wait for a response
 // await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')
//await successButton.waitFor({state: 'attached'})

//wait for the entire network calls to be idle/not loading state
await page.waitForLoadState('networkidle')  //takes more 


  const text = await successButton.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')

})