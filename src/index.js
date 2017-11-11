import OAuth2 from 'client-oauth2'
import Kitsu from 'kitsu'
import Ora from 'ora'
import input from 'input'
import moment from 'moment'
import { version, homepage } from '../package'
import { config } from '../config'

const USERNAME = config.USERNAME
const PASSWORD = config.PASSWORD

const now = moment()
const api = new Kitsu()
const auth = new OAuth2({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  accessTokenUri: 'https://kitsu.io/api/oauth/token'
})

api.headers['User-Agent'] = `InactivityPruner/${version} (${homepage})`

const ora = Ora({ color: 'yellow', text: '' }).start()

const findInactiveUsers = async follows => {
  try {
    for (let { id, followed } of follows) {
      if (followed === undefined) {
        await api.remove('follows', id)
        ora.text = 'Unfollowed deleted user'
      } else {
        ora.text = `Fetching ${followed.name}'s feed`

        const { data: feed } = await api.fetch(`feeds/user_aggr/${followed.id}`, {
          page: { limit: 1 }
        })
        // Get activity timestamp
        let time = moment(await feed[0].updatedAt)
        // Skip if last activity was less than 6 months
        if (await now.diff(time, 'months') >= 6) {
          ora.stop()
          console.log(`${followed.name} was last active ${time.fromNow()}`)
          if (await input.confirm(`Unfollow ${followed.name}`)) {
            ora.start()
            ora.text = `Unfollowing ${followed.name}`
            ora.color = 'blue'
            await api.remove('follows', id)
            ora.text = `Unfollowed ${followed.name}`
            ora.color = 'green'
          } else ora.start()
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
    if (links.next) await getFollows({ id, offset: offset += 20 })
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  try {
    ora.text = 'Logging In'
    let { accessToken } = await auth.owner.getToken(USERNAME, PASSWORD)
    api.headers['Authorization'] = await `Bearer ${accessToken}`
    ora.text = 'Fetching your user ID'
    let { id } = await api.self({ fields: { users: 'id' } })
    if (id === undefined) {
      ora.stop()
      console.error(
        'Could not retrieve your user ID.\n' +
        'Check your username and password is correct.'
      )
    }
    await getFollows({ id })
  } catch (error) {
    console.error(error)
  }
}

main()
