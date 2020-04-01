import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = (props) => {
    const [notes, setNotes] = useState([])

    const eventHandler = response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      }

    const hook = () =>{
        axios
          .get('http://app-3laween.herokuapp.com/api/notes')
          .then(eventHandler)
    } 
    
    useEffect(hook,[])
      console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
          }
        axios.post("http://app-3laween.herokuapp.com/api/notes",noteObject).then(response => {
            setNotes(notes.concat(response.data))
            setNewNotes('')
        })
    }

    const [newNote, setNewNotes] = useState(
        'a new note...'
    )

    const handleNoteChange = (event) => {
        setNewNotes(event.target.value)
    }

    return (
      <div>
        <h1>Notes</h1>
        <ul>
         {notes.map((note,i) => 
         <Note key={i} note={note} />
         )}
        </ul>

        <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      </div>
    )
}

export default App