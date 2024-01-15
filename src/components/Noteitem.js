import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext)

  const {deleteNote} = context;
  const {note , updateNote} = props;
  return (
    <div>
  
      <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className='far fa-trash-alt mx-2' onClick={()=>{deleteNote(note._id)
      props.showAlert("Deleted Successfully","success")
    
    }}></i>
    <i className='far fa-edit mx-2' onClick={()=>{updateNote(note)
      props.showAlert("Updated Successfully","success")
    
    }}></i>
  </div>
</div>
    </div>
  )
}

export default Noteitem
