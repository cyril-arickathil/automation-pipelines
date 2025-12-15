//https://playwright.dev/docs/test-fixtures#without-fixtures

import {test as base} from '@playwright/test'

import { NavigationPage } from '../pages/navigation.page';
import { FormLayoutsPage } from '../pages/formLayouts.page';


//extending test to add userdefined fixtures

// Declare the types of your fixtures.
type MyFixtures = {
  navigationPage: NavigationPage;
  formLayoutsPage: FormLayoutsPage;

};

export const test = base.extend<MyFixtures>({
  navigationPage: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);  //object creation happens here only once
    await use(navigationPage);
  },
  formLayoutsPage: async ({page}, use) =>
  {
    const formLayoutsPage = new FormLayoutsPage(page)
    await use(formLayoutsPage)
  }



})


export {expect} from '@playwright/test';
