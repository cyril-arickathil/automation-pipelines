import { test, expect } from '../config/my-test';



test('basic test', async ({navigationPage, formLayoutsPage }) => {
  await navigationPage.formLayoutsPage();
  await formLayoutsPage.submitUisngInLineForm('john doe', 'test@email.com', false)
});

test('basic test with fixtures', async ({navigationPage, formLayoutsPage }) => {
  await navigationPage.formLayoutsPage();
  await formLayoutsPage.submitUisngInLineForm('john doe', 'test@email.com', false)
});
