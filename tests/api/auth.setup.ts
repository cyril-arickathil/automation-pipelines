import {test as setup} from '@playwright/test'
import { request } from 'http'

setup('authenticate user', async ({request}) =>
{
  const response =
  await request.post('/users/login',{
    data:
    {
    "email": "cyril_test@test.com",
    "password": "test1234567"
}
  })
  const responseBody = await response.json()
  console.log(responseBody.token)

  const TOKEN = responseBody.token
})


//terinary operator

