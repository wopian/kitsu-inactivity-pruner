import OAuth2 from 'client-oauth2'
import JsonApi from 'devour-client'
import Ora from 'ora'
import input from 'input'
import moment from 'moment'
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

Kitsu.define('activity', {
  time: ''
})

Kitsu.define('activityGroup', {
  activity: {
    jsonApi: 'hasOne',
    type: 'activity'
  },
  activities: {
    jsonApi: 'hasOne',
    type: 'activities'
  }
}, { collectionPath: 'feeds/user_aggr' })

const main = async () => {
  const ora = await Ora({ color: 'yellow', text: 'Authorising' }).start()
  let { accessToken } = await auth.owner.getToken(username, password)
  Kitsu.headers['Authorization'] = `Bearer ${accessToken}`

  // Get user ID
  ora.text = await 'Fetching user ID'
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
    ora.text = await 'Fetching follows'
    // Get followed users
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
      ora.text = await `Fetching ${user.followed.name} activity`
      ora.color = await 'cyan'
      // Get last activity from each followed user
      let feed = await Kitsu.one('activityGroup', user.followed.id).get({
        include: 'media,user',
        page: { limit: 1 }
      })
      // Get the activity timestamp
      let time = await moment(feed[0].activities.time)
      // Skip if last activity was less than 60 days
      if (await moment().diff(time, 'months') >= 6) {
        await ora.stop()
        // console.log(`\nhttps://kitsu.io/users/${user.followed.name}`)
        await console.log(`${user.followed.name} was last active ${time.fromNow()}`)
        // Ask user for confirmation
        if (await input.confirm(`Unfollow ${user.followed.name}?`, { default: false })) {
          console.log('If only deletion was implemented yet.')
        }
        await ora.start()
      }
      ora.color = await 'yellow'
    }
    // Load next page if it exists
    if (await response.links.next) await getFollows(offset += 20)
  }

  await getFollows(0)

  ora.stop()

  /*
  Kitsu.destory('follow', 396878)
  */
}

main()

// https://kitsu.io/api/edge/follows?include=follower&page[limit]=20&page[offset]=${offset}&sort=-created_at&filter[followed]=${username}

// TODO: Delete follower:
// DELETE "https://kitsu.io/api/edge/follows/396878
// GET    `https://kitsu.io/api/edge/users?filter[name]=${userInput}&fields[users]=id`
