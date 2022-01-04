import { rest } from 'msw'
export default [
  rest.post('/user/login', (_req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(500),
      ctx.json({
        code: 0,
        data: {
          access_token: 'access_token',
          refresh_token: 'refresh_token',
        },
        message: 'message'
      })
    )
  }),

  rest.post('/user/getUserInfo', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: {
          roles: ['admin'],
        },
      })
    )
  }),
]
