import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [catImageUrl, setCatImageUrl] = useState('')
  const [fact, setFact] = useState('')

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('https://catfact.ninja/fact')
          const data = await response.json()
          const { fact } = data
          setFact(fact)
        } catch (error) {
          console.error(error)
        }
      }
    )()
  }, [])

  useEffect(() => {
    if (fact) {
      (
        async () => {
          try {
            const firstWord = fact.split(' ', 3).join(' ')
            const response = await fetch(`https://cataas.com/cat/says/${firstWord}`)
            const data = await response
            const { url } = data
            setCatImageUrl(url)
          } catch (error) {
            console.error(error)
          }
        }
      )()
    }
  }, [fact])

  return (
    <>
      <h1>Random Cat</h1>
      { fact && <p>{fact}</p> }
      { catImageUrl && <img src={catImageUrl} alt="random cat" width={300} height={300} /> }
    </>
  )
}

export default App
