import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) =>
{
  await page.goto('http://localhost:4200/')
 

})

test.describe('form layouts page', () =>
{
  test.describe.configure({mode: 'serial'})
  test.describe.configure({retries: 2})

  
  test.beforeEach( async ({page}) =>
  {
     await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

  })
  test('input field', async ({page}) =>
  {
    const usingGridEmailInput =
    page.locator('nb-card', {hasText: "Using the Grid"})
    .getByRole('textbox', {name: 'Email'})

    await usingGridEmailInput.fill('email@test.com')
    await expect(usingGridEmailInput).toHaveValue('email@test.com')


  })

  test('radio button field', async ({page}) =>
  {
    const usingGridForm =
    page.locator('nb-card', {hasText: "Using the Grid"})
 
    await usingGridForm.getByLabel('Option 2').check({force: true})

    await usingGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()
    await page.waitForTimeout(2000)

    //visual check - pixel by pixel comparison
    await expect(usingGridForm).toHaveScreenshot({maxDiffPixelRatio: 0.01})
   // await usingGridForm.screenshot({path: 'screenshots/usingTheGridSection.png'})




  })

  test.skip('checkboxes field', async({page}) =>
  {
    await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})
await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true})

//test whether all checkboxes are checked 
const all_checkBox =
page.getByRole('checkbox')  //3 elements

for(const box of await all_checkBox.all())
{
    await box.uncheck({force: true})
    expect(await box.isChecked()).toBeFalsy()
}
  })

test.skip('handle dropdowns', async ({page}) =>
{
  const dropMenu = page.locator('ngx-header nb-select')
  await dropMenu.click();

// <ul>
// <li>
// <li>
// </ul>
//page.getByRole('list').getByRole('listitem')

const optionList = page.getByRole('list').locator('nb-option')

await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

await optionList.filter({hasText: 'Cosmic'}).click()

const header = page.locator('nb-layout-header')

expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

await dropMenu.click();

const colors =
{
  "Light": "rgb(255, 255, 255)" ,
  "Dark":  "rgb(21, 26, 48)",
  "Cosmic": "rgb(50, 50, 89)",
  "Corporate": "rgb(255, 255, 255)" 
}
//colors['Light'] // 
await dropMenu.click();
for(const color in colors)
{
  await optionList.filter({hasText: color}).click()
  const header = page.locator('nb-layout-header')

expect(header).toHaveCSS('background-color', colors[color])
await dropMenu.click()

}
//nb-tooltip

})
 test.skip('tool tips', async ({page}) =>
  {
    await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()


    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    page.getByRole('tooltip')

    const toolTipText =
    await page.locator('nb-tooltip').textContent()

    expect(toolTipText).toEqual('This is a tooltip')

  })

  test('dialog box', async ({page}) =>
  {
    await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()
//by default pw dismisses dialog box


page.on('dialog', dialog =>
{
 // dialog.dismiss()// cancel
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept() //OK
})


  await page.getByRole('table').locator('tr', {hasText: '@mdo'})
  .locator('.nb-trash').click()  // trigger for dialog box

//


  })
  test('web tables 1 ', async ({page}) =>
  {
    await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  //locate a row , <tr>
  const tableRow = page.getByRole('row', {name: '@snow'})

  await tableRow.locator('.nb-edit').click()

  await page.locator('input-editor').getByPlaceholder('First Name').fill('Rahul')
  await page.locator('input-editor').getByPlaceholder('Last Name').fill('S')
  await page.locator('input-editor').getByPlaceholder('Age').fill('25')
  await page.locator('.nb-checkmark').click()

  //test the filter for different ages

  const ages = ['20', '30', '40', '100']


  for(let age of ages)
  {
        await page.locator('input-filter').getByPlaceholder('Age').clear()

    await page.locator('input-filter').getByPlaceholder('Age').fill(age)
    await page.waitForTimeout(1000)  //wait for table to refresh for 0.5secs

    //page.getByRole('row')
    const ageRows = page.getByRole('row')  //all rows

    for(let row of await ageRows.all())
    {
        const cellValue = row.locator('td').last()
        console.log(cellValue)

        expect(await cellValue.textContent()).toEqual(age)
    }
  }
})

test('datepicker section', async ({page}) =>
  {
  await page.getByText('Forms').click()
  await page.getByText('Datepicker').click()

  const calenderInput =  page.getByPlaceholder('Form Picker')

  await calenderInput.click()

  //date class
  let date = new Date()
  date.setDate(date.getDate() +7) //current date + 1 day
  //here date now will be set as 26
//Nov 1, 2025
const expectedDate = date.getDate().toString()
//Nov , Dec , Jan
const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
const expectedYear = date.getFullYear()

const dateAssertion = `${expectedMonth} ${expectedDate}, ${expectedYear}`
  //by attribute
//page.locator('[type="email"]')
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    

    await expect(calenderInput).toHaveValue(dateAssertion)

  })

  test('slider component', async ({page})=>
  {
    await page.getByTitle('IoT Dashboard').click()
      // cx, cy
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( circle =>
    {
      circle.setAttribute('cx', '232.63')
      circle.setAttribute('cy', '232.63')
    //  circle.getAttribute('cx')
    }
    )
    await tempGauge.click()
    //30 degree


  })


})


// const valentines = new Date();
// const day = valentines.getDay();  //2
// day.toLocaleString('en-US', {weekday: 'long'}) // "Monday"
//                       0       1
// const dayNames = ["Sunday", "Monday", "Tuesday" /* , … */];
// dayNames[0] 
// console.log(dayNames[day]); // "Monday"