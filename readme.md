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
