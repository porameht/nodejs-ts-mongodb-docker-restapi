**_user handler_**

1. initial porject create package.json file `npm init -y`

2. install dependencies `npm install express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid`

3. install development dependencies `npm install @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D`

4. create tsconfig.json `npm tsc --init` and set inside file `"outDir": "build"`

5. create new folder `src` on root and create new file `app.ts` inside app.ts say _console.log("hello world")_

6. add script inside file package.json `"dev": "ts-node-dev --respawn --transpile-only src/app.ts"` then run script `npm dev` you should see _hello world_ in terminal

7. create folder in the root directory inside of config create one file `default.ts` set that to mongodb local host 27017

8. create folder utils within src directory and create file `connect.ts` to house our database connection and import function connect inside _app.ts_

9. create `logger.ts` file within utils folder for _logger_ and add _timestamp_ and import function log inside `app.ts`

10. create file `routes.ts` on root directory for forwarding it on to a _controller_ and `app.ts` import function _routes_ from `routes.ts` then implement route `/healthcheck` and check status by `curl http://localhost:1337/healthcheck` we should see status `OK`

11. create `middleware` folder within src folder and inside middleware create new file `validateResource.ts` for validate the request again that schema and we're going to make sure that both of those fields are present, and make sure that email in actually an email, to use is library `zod` and `yup`

12. create `models` folder within of models going to create `user.model.ts` connect db by library `mongoose` and hash password by `bcrypt` and create `saltWorkFactor` inside `default.ts`

    - define `userSchema`
    - define export interface `UserDocument`
    - define `userSchema.pre` for check that password is modified or not?
    - compare password method `userSchema.methods.comparePassword`
    - have a look at `UserModel` add interface `<UserDocument>` to constant

13. create `controller` folder and inside controller will create file `user.controller.ts`

    - define function `createUserHandler` for call create user service
    - add and set route post method of `createUserHandler` to `routes.ts`

14. create `service` folder and inside service will create a `user.service.ts` then import `UserModel` from `user.model.ts` and implement interface `UserDocument` from `user.model.ts`

    - define function `createUser` and pass value input
    - define new error

15. create `schema` folder and inside folder will create file `user.schema.ts` the difinition for our payload so if have a look at middleware

    - define constant `createUserSchema`
    - check password gether more then 6 chars
    - check email is valid or not ?
    - dot refine is to take callback and the argument data for compare password and to give an error message
    - create export type `CreateUserInput` and implement interface `typeof createUserSchema`

16. let's go to `routes.ts` for use this middleware

    - import `validateResource` from a middleware that take schema `createUserSchema` from `user.schema.ts` you should see `app.post("/api/users", validateResource(createUserSchema), createUserHandler);`

17. let's go to `user.service.ts` because interface don't match createdat and updateat you should see`Omit<UserDocument, "createdAt" | "updatetAt" | "comparePassword">`

18. let's go to `user.controller.ts` have a look at `Req:Request` then take hover the `Req:Request` and pass generic `CreateUserInput['body']` in params of `Req:Request`

19. let's go to `user.schema.ts` add Omit to `CreateUserInput` for compare password from CreateUserInput pass generic `"body.passwordConfirmation"`

20. let's go to `app.ts` and get middleware then add `app.use(express.json);` and check validateResource that have `next()` or not ?

21. test api of route `http://localhost:1337/api/users` by postman result is OK status 200

22. let's go to `user.controller.ts` import `import omit from 'lodash'` and add to return for convert user to JSON object then password will is not response you should see `return res.send(omit(user.toJSON(), "password"));`

**_session handler_**

23. let's go to folder `models` and create new file `session.model.ts` then copy file `user.model.ts` to file `session.model.ts`

    - rename from variable `user` to `session`
    - remove compare password and pre-save hook
    - rename inside userSchema from `email` to `user` and change type from `String` to `mongoose.Schema.types.ObjectId`
    - rename inside userSchema from `name` to `valid` and change type from `String` to `boolean`
    - remove `password` inside userSchema
    - you should have a look at interface `UserDocument` rename to `SessionDocement` and inside interface change from `email` to `user` and change type from `string` to `UserDocument["_id"]` then delete `password`
    - inside `sessionSchema` add `userAgent` define type `String` and add to interface `SchemaDocement`

24. let's go to `service` folder and create new file `session.service.ts`

    - import `SessionModel` from `session.model` for implement in this file
    - export function `createSession` and create sessionModel

25. let's go to `controller` folder and create new file `session.controller.ts` for export function `createUserSessionHandler`

    - let's go to `user.service.ts` for create export function `validatePassword()` this function can check an email or password if the password is correct to return user object else return false
    - import `validatePassword()` from `user.service.ts`

    - create method

      1. validate the user's password
      2. create a session
      3. create an access token

         - let's go to `utils` then create new file `jwt.utils.ts`
         - import `import jwt from "jsonwebtoken"`
         - import `import config from "config"` and going to assign the jwt with a private key for varify private key with a public key generate by `https://travistidwell.com/jsencrypt/demo/`
         - create function `signJwt()` and function `verifyJwt()` then implement those both
         - define constant `accessToken`
         - assign access time to leave `accessTokenTtl` in `default.ts`
         - assign refresh time to leave `refreshTokenTtl` in `default.ts`

      4. create a refresh token
      5. return access & refresh tokens

26. let's go to `routes.ts` for implement route of `/api/session` and use middleware

    - create file inside schema of session api `session.schema.ts` for middleware
    - import `zod` and create constant `createSessionSchema`

    - third route for getting method GET all sessions user in `routes.ts` file, create route `/api/sessions`
    - then pass function `getUserSessionHandler` this new function will create inside file `session.controller.ts`

      1. create async function `findSessions` in file `session.service.ts` return `SessionModel`
      2. import `SessionDocement` from `session.service.ts` for implement interface
      3. import `FilterQuery` from `import { FilterQuery } from "mongoose";`

    - create middleware inside folder `middleware` call file `deserializeUser.ts`

      1. create function `deserializeUser` within this function define `accessToken`
      2. import `verifyJwt` from `jwt.utils.ts`

    - comeback to `session.controller.ts` and implement function `getUserSessionHandler` then import to file `route.ts`
    - let's go to `app.ts` for define use middleware `app.use(deserializeUser)`

    - let's go to `middleware` folder inside will create file `requireUser.ts` for make sure that user require
      1. create function `requireUser`
      2. go to `route.ts` import and pass `requireUser` to `app.use(deserializeUser)`
      3. test GET method `/api/sessions` by postman again

27. let's go to `controller` folder and create new file `session.controller.ts` for export function `deleteSessionHandler` for delete session

    - comeback to `session.service.ts` then define export async function `updateSession`
    - comeback to `session.controller.ts` import `updateSession`
    - go to `routes` import `deleteSessionHandler` and create route `app.delete`

28. let's go to `deserializeUser.ts` for create middleware refresh token `const refreshToken` then define condition `if (expired && refreshToken)`

    - let's go to `session.service.ts` for create export async function `reIssueAccessToken()` and implement
    - let's go to `user.service.ts` then define export async function `findUser()`

**_product_**

29. let's come into `service` folder then create new file `product.service.ts`

30. let's go to `models` folder and create new file `product.model.ts`

    - then copy code inside file `session.model.ts`
    - import `customAlphabet` from `nanoid`
    - change name interface from `SessionDocement` to `ProductDocument` and change variable name
    - change constant name from `sessionSchema` to `productSchema`
    - comeback to `product.service.ts`
      1. creating service `createProduct()`
      2. creating service `findProduct()`
      3. creating service `findAndUpdateProduct()`
      4. creating service `deleteProduct()`

31. let's go to `controller` folder then inside creating new file `product.controller.ts`

    1. create export async function `createProductHandler`
    2. create export async function `updateProductHandler`
    3. create export async function `getProductHandler`
    4. create export async function `deleteProductHandler`

32. let's go to `schema` folder then inside folder creating new file `product.schema.ts`

    1. import `{object,number,string,TypeOf}` from `zod`
    2. create constant `payload`
    3. create constant `params`
    4. create export constant `createProductSchema`
    5. create export constant `updateProductSchema`
    6. create export constant `deleteProductSchema`
    7. create export constant `getProductSchema`
    8. export all const and ues typeOf

33. comeback to `controller` file name `product.controller.ts`

    1. import `createProductInput` and pass to Request parameter of function `createProductHandler`
    2. import `updateProductInput` and pass to Request of 3 function
    3. implement all function

34. comeback to `routes` and create route of products
    1. create post method `/api/products`
    2. create put method `/api/products/:productId`
    3. create get method `/api/products/:productId`
    4. create delete method `/api/products/:productId`
