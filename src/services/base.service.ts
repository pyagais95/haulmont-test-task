export default class BaseService  {

  async getJSON(api: string) {
    try {
      const request = await fetch(api, {
        method: 'Get',
      })
      return await request.json()
    } catch (e) {
      console.error('', e)
    }
  }

}