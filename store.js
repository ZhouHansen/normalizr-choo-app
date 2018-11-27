module.exports = (state, emitter) => {
  Object.assign(state, {
    articles: [
      new Article(1, 'love', {id: 1, name: 'a'}, 
      [{id: 1, commentor: {id: 1, name: 'a'}}, {id: 2, commentor: {id: 2, name: 'b'}}]),
      new Article(2, 'hate', {id: 2, name: 'b'}, 
      [{id: 3, commentor: {id: 1, name: 'a'}}, {id: 4, commentor: {id: 2, name: 'b'}}]),
      new Article(3, 'smile', {id: 2, name: 'b'}, 
      [{id: 5, commentor: {id: 3, name: 'c'}}, {id: 6, commentor: {id: 2, name: 'b'}}]),
      new Article(4, 'sleep', {id: 3, name: 'c'}, 
      [{id: 7, commentor: {id: 2, name: 'b'}}, {id: 8, commentor: {id: 3, name: 'c'}}]),
    ]
  })

  emitter.on('state:becomeNoble', id => {
    state.articles = state.articles.map(data => {
      if (data.author.id === id) {
        data.author.name += ' de'
      }

      data.comments = data.comments.map(comment => {
        if (comment.commentor.id === id) {
          comment.commentor.name += ' de'
        }   
        
        return comment
      })

      return data
    })
  })  

  emitter.on('state:loseNoble', id => {
    state.articles = state.articles.map(data => {
      if (data.author.id === id) {
        data.author.name = data.author.name.replace(/ de$/g, '');
      }

      data.comments = data.comments.map(comment => {
        if (comment.commentor.id === id) {
          comment.commentor.name = comment.commentor.name.replace(/ de$/g, '');
        }   
        
        return comment
      })

      return data
    })
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