import {test , expect} from '@playwright/test'
import {NavigationPage} from '../pages/navigation.page'
import {FormLayoutsPage} from '../pages/formLayouts.page'
import {faker} from '@faker-js/faker'

test.beforeEach(async ({page}) =>
{
  await page.goto('/')
})

test('navigating to form layout page', async ({page})=>
{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toolTipPage()
    await navigateTo.toasterPage()
})

test('navigating to form layout page and submit form',{tag: '@sanity'},
     async ({page})=>
{
    const navigateTo = new NavigationPage(page)
    const onFormLayouts = new FormLayoutsPage(page)
    
    const randomFullName = faker.person.fullName()  // Alex Adams
    //alexadams21@gmail.com
    //Alex Adams
    //AlexAdams
//alexadams

    const randomEmail = `${randomFullName.split(' ').join('').toLowerCase()}${faker.number.int({min:10, max:99})}@gmail.com`
    const randomPassword = faker.internet.password({prefix: 'cyril'})
    //nameRandomPassword
        console.log(randomPassword)
        //cyrilMOCtLemg7n
    await navigateTo.formLayoutsPage()
    await onFormLayouts.submitUsingTheGridForm('test@email.com', randomPassword, 'Option 1')
    await onFormLayouts.submitUisngInLineForm(randomFullName, randomEmail,true )
    await page.screenshot({path: 'screenshots/formSubmission_page.png', fullPage: true})
})

test('example here', {tag: ['@regression', '@smoke']},
    async ({page})=>
{
    const navigateTo = new NavigationPage(page)
    
})