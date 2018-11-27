module.exports = (state, emitter) => {
  Object.assign(state, {
    articles: [
      new Article(1, 'love', {id: 1, name: 'a'}, [{id: 1, name: 'a'}, {id: 2, name: 'b'}]),
      new Article(2, 'hate', {id: 2, name: 'b'}, [{id: 1, name: 'a'}, {id: 2, name: 'b'}]),
      new Article(3, 'smile', {id: 2, name: 'b'}, [{id: 3, name: 'c'}, {id: 2, name: 'b'}]),
      new Article(4, 'sleep', {id: 3, name: 'c'}, [{id: 2, name: 'b'}, {id: 3, name: 'c'}]),
    ]
  })

  emitter.on('state:becomeNoble', id => {
    state.articles = state.articles.map(data => {
      if (data.author.id === id) {
        data.author.name += ' de'
      }

      data.commentUsers = data.commentUsers.map(user => {
        if (user.id === id) {
          user.name += ' de'
        }   
        
        return user
      })

      return data
    })
  })  

  emitter.on('state:loseNoble', id => {
    state.articles = state.articles.map(data => {
      if (data.author.id === id) {
        data.author.name = data.author.name.replace(/ de$/g, '');
      }

      data.commentUsers = data.commentUsers.map(user => {
        if (user.id === id) {
          user.name = user.name.replace(/ de$/g, '');
        }   
        
        return user
      })

      return data
    })
  })    
}

class Article {
  constructor (id, name, author, commentUsers) {
    this.id = id
    this.name = name
    this.author = author
    this.commentUsers = commentUsers
  }
}