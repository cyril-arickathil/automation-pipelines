import { expect} from '@playwright/test'
import { test } from '../testOptions'

test('drag and drop test', async ({page, globalUrl})=>
{
  //
  await page.goto(globalUrl)

  const frame =
  page.frameLocator('[rel-title="Photo Manager"] iframe')
  const target = frame.locator('#trash')

    await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(target)

    //user controlled way
    await frame.locator('li', {hasText: 'High Tatras 3'}).hover()
    await page.mouse.down()  //pressing down on mouse
    await target.hover()
    await page.mouse.up()    //releasing mouse button

    //check whether the items are in the target area

    await expect(target.locator('li h5')).toHaveText(['High Tatras 2', 'High Tatras 3'])

})


// <html>

// <iframe>
//     <html>
//         <body> <li>High Tatras</li> </body>
//     </html>

// </iframe>



// </html>

//design patterns in automation frameworks??

//BDD in pw use test.Step('user is dragging item')