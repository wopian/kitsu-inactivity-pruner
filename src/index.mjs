import fs from 'fs'
import OAuth2 from 'client-oauth2'
import Kitsu from 'kitsu'
import Ora from 'ora'
import Confirm from 'prompt-confirm'
import moment from 'moment'
import { config } from '../config.mjs'

const require = (filepath, encoding = 'utf8') => JSON.parse(fs.readFileSync(filepath, { encoding }))

const { version, homepage } = require('./package.json')
const USERNAME = config.USERNAME
const PASSWORD = config.PASSWORD

const now = moment()
const api = new Kitsu()
const auth = new OAuth2({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  accessTokenUri: 'https://kitsu.io/api/oauth/token'
})

let removedCount

api.headers['User-Agent'] = `InactivityPruner/${version} (${homepage})`

const ora = Ora({ color: 'yellow', text: '' }).start()

const promptToUnfollow = async (name, id, timeFromNow) => {
  ora.stop()
  console.log(`${name} was last active ${timeFromNow}`)

  await new Confirm({
    message: `Unfollow ${name}`,
    default: false
  }).run().then(async answer => {
    ora.start()
    if (answer) {
      ora.text = `Unfollowing ${name}`
      ora.color = 'blue'
      await api.remove('follows', id)
      ora.text = `Unfollowed ${name}`
      ora.color = 'green'
      removedCount++
    }
  })
}

const findInactiveUsers = async follows => {
  try {
    removedCount = 0
    for (const { id, followed } of follows) {
      if (followed === undefined) {
        await api.remove('follows', id)
        ora.text = 'Unfollowed deleted user'
      } else {
        ora.text = `Fetching ${followed.name}'s feed`
        const { data: feed } = await api.fetch(`feeds/user_aggr/${followed.id}`, {
          page: { limit: 1 },
          fields: { activityGroups: 'updatedAt' }
        })

        ora.text = `Fetching ${followed.name}'s library`
        const { data: library } = await api.fetch('libraryEntries', {
          page: { limit: 1 },
          filter: { userId: followed.id },
          fields: { libraryEntries: 'updatedAt' },
          sort: '-updatedAt'
        })

        // Get activity timestamp
        const timeFeed = moment(await feed.length > 0 ? await feed[0].updatedAt : 0)
        const timeLibrary = moment(await library.length > 0 ? await library[0].updatedAt : 0)

        const diffFeed = now.diff(timeFeed, 'months')
        const diffLibrary = now.diff(timeLibrary, 'months')

        // Skip if last activity was less than 6 months
        if (Math.min(diffFeed, diffLibrary) >= 6) {
          const lowestTime = diffFeed > diffLibrary ? timeLibrary : timeFeed
          await promptToUnfollow(followed.name, id, lowestTime.fromNow())
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const getFollows = async ({ id, offset = 0 }) => {
  try {
    ora.text = await 'Fetching your follows'
    ora.color = 'green'
    const { data, links } = await api.fetch('follows', {
      fields: { users: 'name' },
      include: 'followed',
      filter: { follower: id },
      page: { limit: 20, offset },
      sort: '-created_at'
    })
    await findInactiveUsers(data)
    if (links.next) await getFollows({ id, offset: offset += 20 - removedCount })
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  try {
    ora.text = 'Logging In'
    const { accessToken } = await auth.owner.getToken(USERNAME, PASSWORD)
    api.headers.Authorization = `Bearer ${accessToken}`
    ora.text = 'Fetching your user ID'
    const { id } = await api.self({ fields: { users: 'id' } })
    if (id === undefined) {
      ora.stop()
      console.error(
        'Could not retrieve your user ID.\n' +
        'Check your username and password is correct.'
      )
    }
    await getFollows({ id })
    ora.stop()
  } catch (error) {
    console.error(error)
  }
}

main()
