const users = [
  { "id": 1, "name": "Lloyd", "age": 40, "nationality": "English" },
  { "id": 2, "name": "Mona", "age": 34, "nationality": "Palestinian" },
  { "id": 3, "name": "Francesco", "age": 24, "nationality": "Italian" }
]

/* responses for /users/:id */
const mocks = [
  {
    route: "/users/:id",
    responses: [
      /* don't support POST here */
      { request: { method: 'POST' }, response: { status: 400 } },

      /* for GET requests, return a particular user */
      {
        name: 'GET user',
        request: { method: 'GET' },
        response: function (ctx, id) {
          ctx.body = users.find(user => user.id === Number(id))
        }
      },

      /* for PUT requests, update the record */
      {
        name: 'PUT user',
        request: { method: 'PUT' },
        response: function (ctx, id) {
          const updatedUser = ctx.request.body
          const existingUserIndex = users.findIndex(user => user.id === Number(id))
          users.splice(existingUserIndex, 1, updatedUser)
          ctx.status = 200
        }
      },

      /* DELETE request: remove the record */
      {
        name: 'DELETE user',
        request: { method: 'DELETE' },
        response: function (ctx, id) {
          const existingUserIndex = users.findIndex(user => user.id === Number(id))
          users.splice(existingUserIndex, 1)
          ctx.status = 200
        }
      }
    ]
  }
]

module.exports = mocks