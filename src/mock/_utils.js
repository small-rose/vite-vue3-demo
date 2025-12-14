import Mock from 'mockjs'

// 成功响应封装
export const resultSuccess = (data, message = '请求成功') => {
  return Mock.mock({
    code: 200,
    data,
    message,
    success: true,
    timestamp: Date.now()
  })
}

// 失败响应封装
export const resultError = (message = '请求失败', code = 500, data = null) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false,
    timestamp: Date.now()
  })
}

// 分页辅助函数
function pagination(page, pageSize, array) {
  const offset = (page - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

// 分页数据封装
export const resultPageSuccess = (list, page = 1, pageSize = 10, total = 100) => {
  const pageData = pagination(page, pageSize, list)
  return resultSuccess({
    list: pageData,
    pagination: {
      page: Number(page),
      pageSize: Number(pageSize),
      total,
      totalPage: Math.ceil(total / pageSize)
    }
  })
}