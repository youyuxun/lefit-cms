/**
 * 此文件存放项目下通用的接口请求
 * 请将接口作用注释完整
 * findAllGroup --- 请求数据库中所有的用户分组
 * GET_OPEN_CITY_LIST --- 请求数据库中已开放的城市列表
 * queryDictByType --- 根据传入字典值查询库中对应数据
 * queryBusiness --- 查询已有的业务线
 * qiniuToken --- 获得七牛云token
 */

import request from '../utils/_request'

/**
 * 请求当前登录用户信息
 * @param params
 * @return {Promise<*>}
 */
export async function GET_ADMIN_USER_INFO (params) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      ...params,
      package: 'public_platform.inner_account.admin_user.base_info',
      class: 'GET_ADMIN_USER_INFO',
    },
  })
}
/**
 * 当前登录用户退出
 * @return {href}
 */
export async function LOGOUT (params) {
  return request({
    url: '/logout',
    method: 'get',
    data: params,
  })
}

/**
 * 请求用户信息
 * @param params
 * @return {Promise<*>}
 */
export async function GET_USER_INFO (params) {
  return request({
    url: '/conduct/lapis?c=GET_USER_INFO',
    method: 'post',
    data: {
      ...params,
      package: 'public_platform.user_sys.user_front.pull',
      class: 'GET_USER_INFO',
    },
  })
}

/**
 * 请求菜单
 * @param params
 * @return {Promise<*>}
 */
export async function GET_ADMIN_USER_RIGHTS (params) {
  return request({
    url: '/conduct/lapis?c=GET_ADMIN_USER_RIGHTS',
    method: 'post',
    data: {
      ...params,
      sub_system_code: 'E-business-CMS',
      package: 'public_platform.inner_account.admin_user.right_manage',
      class: 'GET_ADMIN_USER_RIGHTS',
    },
  })
}

/**
 * 请求数据库中所有的用户分组
 * @param params
 * @return {Promise<*>}
 */
export async function findAllGroup (params) {
  return request({
    url: '/conduct/dubbo/v1/rights/findAllGroup',
    method: 'post',
    data: {
      ...params,
    },
  })
}

/**
 * 请求数据库中已开放的城市列表
 * @return {Promise<*>}
 * @constructor
 */
export async function GET_OPEN_CITY_LIST () {
  return request({
    url: '/conduct/lapis?c=GET_OPEN_CITY_LIST',
    method: 'post',
    data: {
      package: 'public_platform.ground_sys.open_city',
      class: 'GET_OPEN_CITY_LIST',
    },
  })
}

/**
 * 请求商品中心列表（底层所有业务线的商品集合）
 * @param params
 * @return {Promise<*>}
 */
export async function getGoodsList (params) {
  return request({
    url: '/conduct/dubbo/v1/goods/getGoodsList',
    method: 'post',
    data: {
      ...params,
    },
  })
}

/**
 * 根据传入字典值查询库中对应数据
 * @param params (type | String )
 * @return {Promise<*>}
 */
export async function queryDictByType (params) {
  return request({
    url: '/conduct/dubbo/v1/dict/queryDictByType',
    method: 'post',
    data: {
      ...params,
    },
  })
}
/**
 * 根据传入字典值批量查询库中对应数据
 * @param params (typeArray | Array )
 * @return {Promise<*>}
 */
export async function queryDictByTypeArray (params) {
  return request({
    url: '/conduct/dubbo/v1/dict/queryDictByTypeArray',
    method: 'post',
    data: {
      ...params,
    },
  })
}

/**
 * 查询已有的业务线
 * @param params
 * @return {Promise<*>}
 */
export async function queryBusiness (params) {
  return request({
    url: '/conduct/dubbo/v1/goods/queryBusiness',
    method: 'post',
    data: {
      ...params,
    },
  })
}

/**
 * 获得七牛云token
 * @return {Promise<*>}
 */
export async function qiniuToken () {
  return request({
    url: '/qiniu',
    method: 'get',
  })
}