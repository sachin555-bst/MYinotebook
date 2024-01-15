import react, { useState, useContext } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);

 //Get all note
 const getNotes = async () => {
  //API to call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {    
      "Content-Type": "application/json",
      "auth-token":
      localStorage.getItem('token')
    }
  
  });

  const json = await response.json()
  console.log(json);
  setNotes(json)
 
};





  //ADD a note
  const addNote = async (title, description, tag) => {
    //TODP : API call

    //API to call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const note =  await response.json();
    setNotes(notes.concat(note));
    
     console.log("Adding a new note");
    // const note =json;
  };

  //Delete a note

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token')
      },
     
    });
    const json = response.json();
    console.log(json)

    console.log("deleting the note with id" + id);

    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //API to call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();
    console.log(json);

    //Logic to edit in client

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index <newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
 
  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
