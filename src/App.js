import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    todo: '',
    todoList: [],
  });
  const [ edit, setEdit ] = useState({
    editTodo: '',
    id: ''
  })
  const [ isUpdate, setIsUpdate ] = useState(false)

  const handleChange = e => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeEdit = e => {
    e.preventDefault();

    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  }

  const handleAdd = e => {
    e.preventDefault();
    const newList = formData.todoList
    newList.push(formData.todo);

    setFormData({
      todo: '',
      todoList: newList
    });
  }

  const handleDelete = i => {
    const newList = formData.todoList
    newList.splice(i, 1);

    setFormData({
      todo: '',
      todoList: newList
    });
  }

  const handleUpdate = i => {
    const newList = formData.todoList
    newList[i] = edit.editTodo;

    setFormData({
      ...formData,
      todoList: newList
    });
  }

  const handleEdit = (i, value) => {
    setIsUpdate(true)
    console.log(i)

    setEdit({
      editTodo: value, id: i
    })
  }
  const handleCancel = () => {
    setIsUpdate(false)
  }

  return (
    <div className="App">
      <div className='main-title'>Todo List</div>
      <div className='form'>
        <input
          type="text"
          name='todo'
          placeholder='create todo'
          onChange={handleChange}
          value={formData.todo}
        />
        <button 
          onClick={handleAdd}
          type="button"
        >
          Add
        </button>
      </div>
      <div className='container'>
      <div className='flex row'>
        <div className='col'>
          <div className='title'>
            <span>List</span>
          </div>
        </div>
        <div className='col'>
          <div className='title'>     
            <span>Actions</span>
          </div>
        </div>
      </div>
      </div>
      
      <div>
        {formData.todoList.length ? 
          formData.todoList.map((value, i) => 
             (<div key={i}>
                <div className='row'>
                  <div className='col text-left'>
                    <span>{value}</span>                  
                  </div>
                  <div>
                  <button type='button' onClick={() => handleEdit(i, value)}>Edit</button>
                    <button
                      type="button"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div> 
              </div>
            )                
          ) : <div>
            Finish Todo
          </div>
        }
        {isUpdate ? (
          <div className='form mt-3'>
            <input
              type="text"
              name='editTodo'
              placeholder='update todo'
              onChange={handleChangeEdit}
              value={edit.editTodo}
            />
            <button 
              onClick={() => handleUpdate(edit.id)}
              type="button"
            >
              Update
            </button>
            <button 
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : ''
        }
      </div>
    </div>
  );
}

export default App;
