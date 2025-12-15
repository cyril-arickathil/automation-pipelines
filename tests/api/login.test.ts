import {test , expect} from '@playwright/test'


test('get user profile app', async({request})=>
{

  const userDetailsResponse =
  await request.get('/users/me', 
    {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
      
    }
  )

  console.log(await userDetailsResponse.json())

})

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Dragon Fruit', id: 150 },
      { name: 'Orange', id: 151 }
    ];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});