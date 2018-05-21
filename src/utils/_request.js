import axios from 'axios'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

axios.defaults.headers.common['Account-Key'] = 'E-business'
axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'
axios.defaults.headers.common['iasso-token'] = window.location.search && window.location.search.split('iasso_token=')[1]
axios.defaults.baseURL = '/ninja/api'

const fetch = (options) => {
  let { method = 'get', data, url } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    const { data } = response
    if (data.status && data.status.code === 401) {
      const href = encodeURIComponent(window.location.href)
      window.location.href = `${data.result.redirect}${href}`
    }
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let { status } = response
    let otherData = {}
    if (response) {
      const { data, statusText } = response
      otherData = data
      msg = data.message || statusText
    } else {
      status = 600
      msg = 'Network Error'
    }
    return { success: false, status, message: msg, ...otherData }
  })
}
