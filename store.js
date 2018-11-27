const { schema, normalize } = require('normalizr')
// Define a users schema
const user = new schema.Entity('users')

// Define your comments schema
const comment = new schema.Entity('comments', {
  commentor: user
})

// Define your article 
const article = new schema.Entity('articles', { 
  author: user,
  comments: [ comment ]
})

module.exports = (state, emitter) => {
  let articlesData = [
    new Article(1, 'love', {id: 1, name: 'a'}, 
    [{id: 1, commentor: {id: 1, name: 'a'}}, {id: 2, commentor: {id: 2, name: 'b'}}]),
    new Article(2, 'hate', {id: 2, name: 'b'}, 
    [{id: 3, commentor: {id: 1, name: 'a'}}, {id: 4, commentor: {id: 2, name: 'b'}}]),
    new Article(3, 'smile', {id: 2, name: 'b'}, 
    [{id: 5, commentor: {id: 3, name: 'c'}}, {id: 6, commentor: {id: 2, name: 'b'}}]),
    new Article(4, 'sleep', {id: 3, name: 'c'}, 
    [{id: 7, commentor: {id: 2, name: 'b'}}, {id: 8, commentor: {id: 3, name: 'c'}}]),
  ]

  let aritclesEntities = normalize(articlesData, [ article ]).entities

  let initState = {
    articles: aritclesEntities.articles,
    users: aritclesEntities.users,
    comments: aritclesEntities.comments,
  }
  console.log(initState)
  Object.assign(state, initState)

  emitter.on('state:becomeNoble', id => {
    state.users[id].name += ' de'    
  })

  emitter.on('state:loseNoble', id => {
    state.users[id].name = state.users[id].name.replace(/ de$/g, '');
  })    
}

class Article {
  constructor (id, name, author, comments) {
    this.id = id
    this.name = name
    this.author = author
    this.comments = comments
  }
}
