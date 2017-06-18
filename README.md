# Micro-API文档

### 用户
- 注册
  - URL： /member/register
  - 请求方式： POST
  - 请求参数：
    名称 | 类型	| 必填 | 备注
    | ------- | ------- | ------- | ------- | 
    | phoneNumber  | string        | Y  | 手机号   |
    | nickname           | string  | Y  | 昵称       |
    | password           | string  | Y  | 密码       |
   - 返回结果示例
    
    ` 
        {
            "code": 0,
            "msg": "注册成功",
            "data": {
            }
        }
    `