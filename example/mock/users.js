const users = [
  { "id": 1, "name": "Lloyd", "age": 40, "nationality": "English" },
  { "id": 2, "name": "Mona", "age": 34, "nationality": "Palestinian" },
  { "id": 3, "name": "Francesco", "age": 24, "nationality": "Italian" }
]

/* responses for /users */
const mocks = [
  {
    route: '/users',
    responses: [
      /* Respond with 400 Bad Request for PUT and DELETE - inappropriate on a collection */
      { request: { method: 'PUT' }, response: { status: 400 } },
      { request: { method: 'DELETE' }, response: { status: 400 } },
      {
        /* for GET requests return a subset of data, optionally filtered on 'minAge' and 'nationality' */
        request: { method: 'GET' },
        response: function (ctx) {
          ctx.body = users.filter(user => {
            const meetsMinAge = (user.age || 1000) >= (Number(ctx.query.minAge) || 0)
            const requiredNationality = user.nationality === (ctx.query.nationality || user.nationality)
            return meetsMinAge && requiredNationality
          })
        }
      },
      {
        /* for POST requests, create a new user and return the path to the new resource */
        request: { method: 'POST' },
        response: function (ctx) {
          const newUser = ctx.request.body
          users.push(newUser)
          newUser.id = users.length
          ctx.status = 201
          ctx.response.set('Location', `/users/${newUser.id}`)
        }
      }
    ]
  }
]

module.exports = mocks
