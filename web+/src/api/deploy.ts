import Axios from './axios'
import { Request, Pagination, ID, Total } from './types'
import { ProjectData } from './project'

export class DeployList extends Request {
  readonly url = '/deploy/getList'
  readonly method = 'get'
  public datagram!: {
    list: ProjectData['datagram']['detail'][]
  }
}

export class DeployRebuild extends Request {
  readonly url = '/deploy/rebuild'
  readonly method = 'post'
  public param: {
    projectId: number
    token: string
  }
  public datagram!: string
  constructor(param: DeployRebuild['param']) {
    super()
    this.param = param
  }
}

export class PublishTraceData {
  public datagram!: {
    detail: {
      id: number
      token: string
      projectId: number
      projectName: string
      detail: string
      state: number
      publisherId: number
      publisherName: string
      type: number
      ext: string
      commit: string
      serverName: string
      publishState: number
      insertTime: string
      updateTime: string
    }
  }
}

export class DeployPreviewList extends Request {
  readonly url = '/deploy/getPreview'
  readonly method = 'get'
  public param: {
    projectId: number
    userId: number
    state: number
    commitDate: string
    branch: string
    commit: string
    filename: string
    deployDate: string
  }
  public pagination: Pagination

  public datagram!: {
    list: PublishTraceData['datagram']['detail'][]
    pagination: Pagination
  }
  constructor(param: DeployPreviewList['param'], pagination: Pagination) {
    super()
    this.pagination = pagination
    this.param = { ...param, ...pagination }
  }
}

export class DeployTrace extends Request {
  readonly url = '/deploy/getPublishTrace'
  readonly method = 'get'
  public param: {
    lastPublishToken: string
  }
  public datagram!: {
    list: PublishTraceData['datagram']['detail'][]
  }
  constructor(param: DeployTrace['param']) {
    super()
    this.param = param
  }
}

export class DeployTraceDetail extends Request {
  readonly url = '/deploy/getPublishTraceDetail'
  readonly method = 'get'
  readonly timeout = 0
  public param: ID
  public datagram!: {
    detail: string
  }
  constructor(param: DeployTraceDetail['param']) {
    super()
    this.param = param
  }
}

/**
 * @param  {int}      projectId
 * @return {Promise}
 */
export function resetState(projectId) {
  return Axios.request({
    url: '/deploy/resetState',
    method: 'put',
    data: { projectId },
  })
}

/**
 * @param  {int}      projectId
 * @param  {string}   commit
 * @return {Promise}
 */
export function publish(projectId, branch, commit) {
  return Axios.request({
    url: '/deploy/publish',
    method: 'post',
    data: { projectId, branch, commit },
  })
}

/**
 * @param  {int}      projectId
 * @param  {string}   commit
 * @param  {Array}    serverIds
 * @return {Promise}
 */
export function greyPublish(projectId, commit, serverIds) {
  return Axios.request({
    url: '/deploy/greyPublish',
    method: 'post',
    data: { projectId, commit, serverIds },
  })
}

export class DeployReview extends Request {
  readonly url = '/deploy/review'
  readonly method = 'put'
  readonly timeout = 0
  public param: {
    projectReviewId: number
    state: number
  }
  constructor(param: DeployReview['param']) {
    super()
    this.param = param
  }
}
