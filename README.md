\# Micro-API文档



## 用户

#### 注册

- URL： /user/register
- 请求方式： POST
- 请求参数：

| 名称           | 类型     | 必填   | 备注   |
| :----------- | :----- | :--- | :--- |
| phone_number | string | Y    | 手机号  |
| nickname     | string | Y    | 昵称   |
| password     | string | Y    | 密码   |

- 返回结果示例

 ```json
   {
     "code": 0,
     "msg": "success",
     "data": {
     }
   }
 ```


#### 登录

- URL： /user/login

- 请求方式： POST

- 请求参数： 

  | 名称       | 类型     | 必填   | 备注       |
  | -------- | ------ | ---- | -------- |
  | username | string | Y    | 用户昵称/手机号 |
  | password | string | Y    | 密码       |


- 返回结果示例

  ```json
  {
    "code":0,
    "msg": "success",
    "data": {
      "nickname": "傻辉",
      "phoneNumber": "13581887557",
      "regDate": "2017-06-22 18:32:56",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Im5laWxsaW4iLCJwaG9uZU51bWJlciI6IjE0MTQxMjQ1NDU1IiwicmVnRGF0ZSI6IjIwMTctMDYtMjIgMjE6NTY6NTkiLCJpYXQiOjE0OTgxNDI2NjYsImV4cCI6MTQ5ODE0NjI2Nn0.54SNXB7IVU_pMPdmL44CB8ChLC7WjiycSy16klA5hHg",
    }
  }
  ```

