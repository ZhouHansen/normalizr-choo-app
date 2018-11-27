let html = require('choo/html')
let Nanocomponent = require('choo/component')

module.exports = view

class Article extends Nanocomponent {
  constructor (state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.becomeNoble.bind(this)
    this.loseNoble.bind(this)
  }  

  createElement (data) {
    let commentUsers = data.commentUsers.map(user => html`
      <span class='mr2' onclick=${this.loseNoble(user.id)}>${user.name} , </span>
    `)

    return html`
      <li>
        <span>book: ${data.name}</span>
        <p onclick=${this.becomeNoble(data.author.id)}>author: ${data.author.name}</p>
        <ul class='pl0'>commentUsers: ${commentUsers}</ul>
      </li>
    `
  }

  becomeNoble (id) {
    return e => {
      this.emit('state:becomeNoble', id)
      this.emit('render')
    }
  }

  loseNoble (id) {
    return e => {
      this.emit('state:loseNoble', id)
      this.emit('render')
    }
  }  

  update () {
    return true
  }    
}

class Articles extends Nanocomponent {
  constructor (state, emit) {
    super()
    this.state = state
    this.emit = emit
  }  

  createElement () {
    let articlesHtml = this.state.articles.map(data => {
      let article = new Article(this.state, this.emit)
      return article.render(data)
    })

    return html`
      <ul class='w-100'>
        ${articlesHtml}
      </ul>
    `
  }

  update () {
    return true
  }    
}

class Component extends Nanocomponent {
  constructor (state, emit) {
    super()
    this.articles = new Articles(state, emit)
  }

  createElement () {
    return html`
      <main class='w-100 flex flex-column flex-auto'>
        ${this.articles.render()}
      </main>
    `
  }

  update () {
    return true
  }  
}

function view (state, emit) {
  var component = new Component(state, emit)

  return html`
    <body class='w-100 flex flex-column bg-n-white'>
      ${component.render()}
    </body>
  `
}