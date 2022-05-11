const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogList) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogList.length === 0 ? 0 : blogList.reduce(reducer, 0)
}
const mostLikes = (blogList) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current
  }
  const mostLiked = blogList.reduce(reducer, 0)
  delete mostLiked['__v']
  delete mostLiked['_id']
  delete mostLiked['url']
  return mostLiked
}

const mostBlogsManuel = (blogList) => {
  const firstReducer = (prev, current) => {
    prev[current] ? ++prev[current] : (prev[current] = 1)
    return prev
  }
  const secondReducer = (prev, current) => {
    const mostBloggedAuthor =
      authorBlogs[prev] > authorBlogs[current] ? prev : current
    const formattedMostBlogs = {
      author: mostBloggedAuthor,
      blogs: authorBlogs[mostBloggedAuthor],
    }
    return formattedMostBlogs
  }
  const authorList = blogList.map((x) => x.author)
  const authorBlogs = authorList.reduce(firstReducer, [])
  const mostBlogs = Object.keys(authorBlogs).reduce(secondReducer, {})

  return mostBlogs
}

const mostLikesByAuthor = (blogList) => {
  const authorLikesArray = blogList.map((blog) => ({
    author: blog.author,
    likes: blog.likes,
  }))

  var result = []
  authorLikesArray.reduce(function (res, value) {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, likes: 0 }
      result.push(res[value.author])
    }
    res[value.author].likes += value.likes
    return res
  }, {})

  const mostLikedAuthor = lodash.maxBy(result, 'likes')

  return mostLikedAuthor
}

module.exports = {
  mostLikesByAuthor,
  mostBlogsManuel,
  totalLikes,
  dummy,
  mostLikes,
}
