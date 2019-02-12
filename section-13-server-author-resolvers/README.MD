# Section 11 Server Review Model
<!-- TOC -->

- [Section 11 Server Review Model](#section-11-server-review-model)
  - [Author Resolvers](#author-resolvers)
  - [Author Type](#author-type)
  - [Author Mutation](#author-mutation)
  - [Next](#next)
  - [Committing to Git](#committing-to-git)

<!-- /TOC -->

## Author Resolvers

Creating the author mutations and queries will help us start heading to creating books and reviews. When a user adds a book they need to type in an author name. If the author doesn't exist it will add the author and if they do exist it will use that authors `_id`. 

## Author Type

First need to create the type for `Author` in our `typeDefs.js` file.


```graphql
type Author {
  _id: String
  name: String
}
```

## Author Mutation

F


## Next

Next is we can want to create mutations and queries for creating and getting an Author. 

## Committing to Git

```
git status
git add .
git commit -m "section 8 server user queries"
```