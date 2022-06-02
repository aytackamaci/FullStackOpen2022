import React, { useCallback } from 'react'

const BlogForm = ({
  title,
  author,
  url,
  addBlog,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
}) => {
  const handleTitleInputChange = useCallback(
    (event) => {
      onTitleChange(event.target.value)
    },
    [onTitleChange]
  )

  const handleAuthorInputChange = useCallback(
    (event) => {
      onAuthorChange(event.target.value)
    },
    [onAuthorChange]
  )

  const handleUrlInputChange = useCallback(
    (event) => {
      onUrlChange(event.target.value)
    },
    [onUrlChange]
  )

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleInputChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorInputChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
