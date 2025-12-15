import {test as base} from '@playwright/test';
import {expect as expectType} from '@playwright/test';


export type TestOptions =
{
  globalUrl : string
}

export const test = base.extend<TestOptions>(
  {
    globalUrl: ['', {option: true}]
  }
)