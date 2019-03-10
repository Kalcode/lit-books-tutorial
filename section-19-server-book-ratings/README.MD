# Section 19 Server Book Rating

<!-- TOC -->

- [Section 19 Server Book Rating](#section-19-server-book-rating)
  - [Books Rating](#books-rating)
    - [Aggregate Functions](#aggregate-functions)
    - [Updating Typedef](#updating-typedef)
    - [Mongo Aggregate Functions](#mongo-aggregate-functions)
    - [Adding the function to book](#adding-the-function-to-book)
  - [Testing](#testing)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Books Rating

In this section we will be creating the rating for a particular book using the reviews left that are associated with the book. 

### Aggregate Functions

We will be pulling all reviews for that book and calculating an average for the book.

We will use this approach to introduce the idea of leveraging a databases ability to aggregate data. SQL and NoSQL have built-in functions that let you manipulate the data via the query to get the result back from the database as needed.

Popular example is using a `count` function to return a number from a collection. Instead of asking for all the items that match a particular query and then creating a function to count the data ourselves we can simply ask the database to give us a count of all items that make that match.

```
query: Products with the name Apple in the name column that have color Red in the color column
aggregate: return the count of all records that match
```

We want to do something similar with our Book rating. 

```
query: Reviews that match the book id
aggregate: return the average of the reviews ratings

```

### Updating Typedef

First we need to update our typedef for `Book`. Open the `typeDefs.js` file and lets update Book with a new field called `rating` and a return type of `Int!`. We always expect a rating, even if it has no rating it should then be a `0`.

*NOTE: Maybe we do expect a `null` to be return with a book with no reviews? This way we can show on the frontend if a book has been reviewed? This is something we can always come back to. Think about how you'd implement that. Maybe a separate resolver that checks if the book has any reviews?*

`server/src/graphql/typeDefs.js`
```graphql
type Book {
  _id: String!
  author: Author!
  description: String!
  published: String!
  reviews: [Review]
  title: String!
  rating: Int! # Add new field
}
```


### Mongo Aggregate Functions

*NOTE: There will be a lot of links here, these will mostly point to the documentation for the mongodb functions. I highly suggest clicking on each for reference. They will show you the syntax the functions accept and other useful information on using the aggregation functions.*

We will leverage [MongoDB aggregation framework to calculate a book's rating.](https://docs.mongodb.com/manual/aggregation/). Mongodb aggregation functions are fast and built to operate off their database. This makes it ideal place to crunch our numbers. 

[First use `$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match) to only aggregate reviews that match the `Book` id. 

```js
{
  '$match': {
    'book': new Types.ObjectId(obj._id),
  }
},
```

The aggregate engine expects the `_id` to match the database `ObjectId` part, so we need to transform our `String` id back to a `ObjectId`. That is the purpose of:

```js
new Types.ObjectId(obj._id)
```

[Then we need to use `$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group) to tell it how we want the data we are about to aggregate to be grouped. 

```js
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }
```

Since we are only getting one book rating back we don't want it to actually be grouped in a certain way so we will use `null` for the data grouping in `_id`. Meaning it should group our rating as one. Next we need to specify the field that will return, we will call `rating`. We could name this return value anything we want, `bookRating` for example. We just happen to use the same name as the column inside `Review`. But the same name for `book` makes sense and we will use it.

```js
{
  '$group': {
    '_id': null, // Group under one
    'rating': {},
  }
},
```

The `accumulator` [we want to use is `$avg` which return the average](https://docs.mongodb.com/manual/reference/operator/aggregation/avg/#grp._S_avg), as long as the number are numerical. We need to tell it what column we want the average of, which in `Review` is `rating`. In this case it is `$rating`. 

```js
{
  '$group': {
    '_id': null, 
    'rating': { '$avg': '$rating' }
  }
},
```

To ensure we get a correct number back, in case the `rating` column is null we want to do a check for it. We will do a conditional check on the column [using `$ifNull`](https://docs.mongodb.com/manual/reference/operator/aggregation/ifNull/#exp._S_ifNull). 


```js
{ '$ifNull': ['$rating', 0] }
```

This will return the column `rating` if not null, or `0` if null. The results will be a list of all the ratings with null be replaced with 0. We then pass this list to `$avg`. At this point `$avg` is not grabbing `rating` column but instead getting the results back from `$ifNull`.

```js
{ '$avg': { '$ifNull': ['$rating', 0] }}
```

Now we need to include this in our `rating` field.

```js
{
  '$group': {
    '_id': null, 
    'rating': { '$avg': { '$ifNull': ['$rating', 0] }}
  }
},
```

We are telling the aggregate pipeline to `aggregate` Review data but to only `$match` the records that have the column `book` match the same id as the book we are querying about. Then tell its to return the average of the data returns from our null check on the `rating` columns of all Reviews that match the book id. Then to put the results in the field `rating` and group by `null` so we get the return of the average as one item.


### Adding the function to book

In our `object-map` for `Book` we want to add a new field `rating`. 

`server/src/graphql/object-maps/Book.js`
```js
import { Types } from 'mongoose'; // Add import

export const Book = {
  author: async function(obj) {
    return Author.findById(obj.author);
  },
  reviews: async function(obj) {
    await BookModel.populate(obj, 'reviews');

    return obj.reviews;
  },
  rating: async function(obj) { // Add rating resolver
    const results = await Review.aggregate([
      {
        '$match': { // Match only records that have the book's, parent's, id
          'book': new Types.ObjectId(obj._id),
        }
      },
      {
        '$group': { // use group to create a new data return
          '_id': null,
          'rating': { '$avg': { '$ifNull': ['$rating', 0] }} // calculate the average
        }
      },
    ]);

    return results[0] ? results[0].rating : 0; // returns an array, expect on item, if not return 0
  }
};
```

The aggregation pipeline will return an array. We only expect one item back since we group by `null`. If there are no records 

```js
[ { _id: null, rating: 3 } ] // With a Review record assocaited with Book

[] // Without

```

Since our resolver is expecting a `Int` to be return for the field `rating` we just want to return the results first index `rating`. `results[0].rating` as `results[0]` can be undefined if `0` items are returned we need a check against, 

```js
return results[0] ? results[0].rating : 0;
```

## Testing

Navigate to the `playground` at `http://localhost:4000/graphql` and lets make a query for our books rating.

Make sure you have created a review from [section 17](../section-17-server-review-resolvers/README.MD)

Have three books created and then create some reviews for them. Leave one book with no reviews. Then when you use the query below

`query`
```graphql
query {
	books {
    description
    rating
  }
}
```

You get a similar output as below:

```json
"books": [
  {
    "title": "Lord Of The Flies",
    "published": "1951",
    "rating": 3
  },
  {
    "title": "The Stuff",
    "published": "2012",
    "rating": 3
  },
  {
    "title": "The Stuff Part 2",
    "published": "2014",
    "rating": 0
  }
]
```

## Next

Next we will create a re-usable guard that will check if a user is valid in the `context` and block any mutation without a token.

## Committing to Git

```
git status
git add .
git commit -m "section 19 server book ratings"
```