import OAuth2 from 'client-oauth2'
import JsonApi from 'devour-client'
import input from 'input'
import { version } from '../package'
// import { log, err, pe } from './util'
import { env } from './env'

let ID

const username = env.USERNAME
const password = env.PASSWORD
const baseUrl = 'https://kitsu.io/api'
const auth = new OAuth2({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  accessTokenUri: `${baseUrl}/oauth/token`
})
const Kitsu = new JsonApi({
  apiUrl: `${baseUrl}/edge`,
  logger: false
})

Kitsu.headers['User-Agent'] = `InactivityPruner/${version} (wopian)`

Kitsu.define('user', {
  name: ''
}, { collectionPath: 'users' })

Kitsu.define('follow', {
  followed: {
    jsonApi: 'hasOne',
    type: 'users'
  }
})

const main = async () => {
  let { accessToken } = await auth.owner.getToken(username, password)
  Kitsu.headers['Authorization'] = `Bearer ${accessToken}`

  // Get user ID
  await Kitsu.findAll('user', {
    fields: {
      users: 'id'
    },
    filter: { name: username },
    page: { limit: 1 }
  })
  .then(response => {
    ID = response[0].id
  })

  let getFollows = async (offset) => {
    let response = await Kitsu.findAll('follow', {
      fields: {
        users: 'name'
      },
      include: 'followed',
      filter: { follower: ID },
      page: {
        limit: 20,
        offset
      },
      sort: '-created_at'
    })
    for (let user of await response) {
      if (await input.confirm(`Do you want to unfollow ${user.followed.name}?`, { default: false })) {
        console.log('If only deletion was implemented yet.')
      }
    }
    if (await response.links.next) await getFollows(offset += 20)
  }

  await getFollows(0)

  /*
  Kitsu.destory('follow', 396878)
  */
}

main()

// https://kitsu.io/api/edge/follows?include=follower&page[limit]=20&page[offset]=${offset}&sort=-created_at&filter[followed]=${username}

// TODO: Delete follower:
// DELETE "https://kitsu.io/api/edge/follows/396878
// GET    `https://kitsu.io/api/edge/users?filter[name]=${userInput}&fields[users]=id`
