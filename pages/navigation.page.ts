import {Locator, Page} from '@playwright/test'

export class NavigationPage
{
  readonly page: Page
  readonly formLayoutMenuItem: Locator
  readonly datePickerMenuItem: Locator
  readonly smartTableMenuItem: Locator
  readonly toolTipMenuItem: Locator
  readonly toasterMenuItem: Locator


  constructor(page: Page )
  {
    this.page = page
    this.formLayoutMenuItem = page.getByText('Form Layouts')
    this.datePickerMenuItem = page.getByText('Datepicker')
    this.smartTableMenuItem = page.getByText('Smart Table')
    this.toolTipMenuItem = page.getByText('Tooltip')
    this.toasterMenuItem = page.getByText('Toastr')
  }

  async formLayoutsPage()
  {
  await this.selectGroupMenuITem('Forms')
  await this.formLayoutMenuItem.click()
  }
  
 async datePickerPage()
  {
  await this.selectGroupMenuITem('Forms')
  await this.datePickerMenuItem.click()
  }
  async smartTablePage()
  {
    await this.selectGroupMenuITem('Tables & Data')
  await this.smartTableMenuItem.click()
  }
  async toolTipPage()
  {
  await this.selectGroupMenuITem('Modal & Overlays')
  await this.toolTipMenuItem.click()

  }
  async toasterPage()
  {
  await this.page.getByText('Modal & Overlays').click()
  await this.toasterMenuItem.click()
  }
  async selectGroupMenuITem(menuItem: string)
  {
    const menu =  this.page.getByTitle(menuItem)

    const isExpanded = await menu.getAttribute('aria-expanded')
    if(isExpanded == 'false')
    {
      await menu.click()
    }
  }


}