import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [editBornYear] = useMutation(EDIT_AUTHOR)

  const result = useQuery(ALL_AUTHORS)
  const options = []

  const authors = result.data.allAuthors
  console.log(authors)
  if (result.loading) {
    return <div>loading...</div>
  }

  for (let i = 0; i < authors.length; i++) {
    const author = {
      label: authors[i].name,
      value: authors[i].name,
    }
    options.push(author)
  }

  if (!props.show) {
    return null
  }

  const handleChange = (value) => {
    const name = value.value
    console.log(name)
    setName(name)
  }
  console.log(name)
  const submit = async (event) => {
    event.preventDefault()
    editBornYear({ variables: { name, setBornTo: parseInt(year) } })

    console.log('update author...')

    setName('')
    setYear('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <div>
          <form onSubmit={submit}>
            <div>
              <Select onChange={handleChange} options={options} />
            </div>
            <div>
              born
              <input
                type="number"
                value={year}
                onChange={({ target }) => setYear(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authors
