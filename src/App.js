import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [userValue, setUserValue] = useState("");
  const [chatLog, setChatLog] = useState([]);


  const isEmpty = !chatLog.length

  const handleSubmit = async () => {
    e.preventDefault();

    const message = { role: "user", content: userValue }

    try {
      axios.post("http://localhost:5000/api", message)

      const data = await response.json()

      if (response.status !== 200) {
        throw data.error ||  new Error(`Request no gree go ${response.status}`); 
      }

      setChatLog((current) => [...current, message, data.completion])
      setUserValue("")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='main'>
      <h1>NOVA AI</h1>
      <div className='log'>
        <ul>
          {chatLog.map((chat, idx) =>
            chat.role === "user" ? (
              <li key={idx}>
                You said
                <span>{chat.content}</span>
              </li>
            ) : (
              <li key={idx}>
                Nova AI says
                <span>{chat.content}</span>
              </li>
            )
          )}
          { isEmpty && <h2>You never ask anything yet</h2> }
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='prompt'
          placeholder='Say Hello'
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
        />
        <button type='submit'>Ask Nova</button>
      </form>
    </div>
  )
}

export default App
