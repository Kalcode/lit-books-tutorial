# Section 6 Server User Model
<!-- TOC -->

- [Section 6 Server User Model](#section-6-server-user-model)
  - [Creating a User Model](#creating-a-user-model)
  - [Schema and Model](#schema-and-model)
    - [creating the model folder](#creating-the-model-folder)
  - [Testing out our model](#testing-out-our-model)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Creating a User Model

In [Section 1 Planning](../section-1-planning/README.MD) we discussed the requirements of the app and modeled our database. At the core to be able to use our app we need a user. Mongoose allows us to create a schema that will describe the kind of data our model in the database will consist of.

## Schema and Model

To create a model we will need a schema that describes our model. 

### creating the model folder

Inside the `db` folder in our `server` we will create another folder called `models` and a file called `User.js`

So `litbooks/server/src/db/models/User.js`

inside the file we will be creating a [mongoose schema](https://mongoosejs.com/docs/guide.html).

Add the following to the file `User.js` that we just created.

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
},
{ 
  timestamps: true,
});

export const User = mongoose.model('User', userSchema);
```

At the top we import `mongoose` from the mongoose library.

` mongoose.Schema` takes an object that describes the model data and constraints. The second argument that Schema takes is options, here we pass in `timestamps` as true to tell `mongoose` to create the `updatedAt` and `createdAt` fields on our model.

Right before we export it we call `mongoose.model` which adds the schema and generates the model to the mongoose instance as `User`.

We will not be adding the `reviews` field yet as we don't have a model for it.`

Our `username` field should ideally be unique, meaning no two users can have the same username. 

To use `unique` without a deprecation warning we also want to add an option to our `connect.js` called `useCreateIndex`. [Check out the github issue here to understand more.](https://github.com/Automattic/mongoose/issues/6890)

[`litbooks/server/src/db/connect.js`](./server/src/db/connect.js)

```js
  await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
```

## Testing out our model

We don't have a Mutation yet that will create a user. So we will create one manually on server boot up.

In your [`index.js`](./server/src/index.js) file add the following line

```js
// Import your model
import { User } from './db/models/User';

async function start() {
  const app = express();

  await connect();

  // add this code
  await User.create({
    username: 'test',
    password: 'test',
  });
```

Boot your server up, then afterwards you can open up your MongoDB gui like [Robo 3T](https://robomongo.org/) or [MongoDB Compass](https://www.mongodb.com/products/compass). Using it to connect to your MongoDB server. In this instance I connect to the host `localhost:27017` and navigate to the database called `litbooks` and under collections you should see `users` with one entry. If you explore that entry it should have two fields, `username`, `password`.

Now we need to delete the code we used to test it. If we don't, every time we start the server it will try and create that user over and over again.

```js
// Delete this
import { User } from './db/models/User';

...

// Delete this
  await User.create({
    username: 'test',
    password: 'test',
  });
```

## Next

Authentication and Authorization is next. We need these components to be able to start creating users.

## Committing to Git

```
git status
git add .
git commit -m "section 6 server user model"
```