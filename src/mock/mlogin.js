import { resultSuccess, resultError, resultPageSuccess } from './_utils'
import  Mock  from 'mockjs'

// 模拟用户数据
const userList = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: Mock.mock('@cname'),
  email: Mock.mock('@email'),
  avatar: Mock.mock('@image("100x100")'),
  phone: /^1[34578]\d{9}$/,
  createTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
  role: Mock.mock('@pick(["admin", "user", "editor"])'),
  status: Mock.mock('@pick([0, 1])')
}))

// 定义路由数组
const userModule = [
  // 获取用户列表
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query
      return resultPageSuccess(userList, page, pageSize, userList.length)
    }
  },
  // 用户登录
  {
    url: '/api/admin/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      
      if (username === 'admin' && password === '123456') {
        return resultSuccess({
          token: Mock.mock('@guid'),
          userInfo: {
            id: 1,
            name: 'Admin',
            roles: ['admin']
          }
        }, '登录成功')
      }
      return resultError('用户名或密码错误')
    }
  },
  // 获取用户详情
  {
    url: '/api/user/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      const user = userList.find(item => item.id === Number(id))
      return user ? resultSuccess(user) : resultError('用户不存在')
    }
  }
]

// 导出模块
export default userModule ;