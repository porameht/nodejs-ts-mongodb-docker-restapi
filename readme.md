> user handler

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

> session handler

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

25. let's go to `controller` folder and create new file `session.controller.ts`

    - export function `createUserSessionHandler`
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
    - import `zod` and create constant `createUserSessionSchema`
