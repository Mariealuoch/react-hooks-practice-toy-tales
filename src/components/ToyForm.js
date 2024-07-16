import React,{useState} from "react";

function ToyForm() {
const [formData, setFormData]=useState({name:'',image:''});
function handleChange(event){
  setFormData({...formData,[event.target.name]:event.target.value})

}
function handleSubmit(event){
event.preventDefault();
fetch(' http://localhost:3001/toys',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData)
})
.then((resp)=>resp.json())
.then((data)=>{console.log('Success',data)})
}



  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
