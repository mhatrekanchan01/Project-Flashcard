
import React, { useState } from "react";
import { createDeck } from "../../utils/api/index"
import { Link, useHistory } from "react-router-dom";




function FillDeckForm(){

    const history = useHistory(); 
    /* set initial form properties to blank value */
    const initialFormState = { 
        name: "",
        description: "",
      };
    const [formData, setformData] = useState({ ...initialFormState }); /* Set form state to blank object*/
      
    /* add new formdata to existing data */
    const handleChange = ({ target }) => {
     setformData({
        ...formData,
         [target.name]: target.value,
      });
      console.log(target.name);
     };
    
   //   

 /* handle submit event */


   async function handleSubmit(event){
    event.preventDefault();  /* prevents page refresh */
  const response = await createDeck({...formData});
  console.log("Submitted:", formData);
    setformData(response);
    setformData({...initialFormState});
    console.log(response);
    event.target.reset();
    history.push("/decks/"+response.id);
   

 }

console.log(formData);  

  //const handleSubmit = (event) => {
  //  event.preventDefault();
//  console.log("Submitted:", formData);

   // setformData({...initialFormState});
  //}


    return (
        <div>
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                    </li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
        <div>
            <h1>Create Deck</h1>
        <form onSubmit={handleSubmit} >
                          <div className="form-group" >
                                <label>Name</label>
                                    
                                    <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Deck Name"
                                    onChange={handleChange}
                                    value={formData.name}    
                                    />   
                                
                            </div>    
                            <div className="form-group">
                                <label>Description</label>
                                    
                                    <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="Brief description of the deck"   
                                    onChange={handleChange}
                                    value={formData.description}
                                /> 
                                
                            </div>    
                        <button type="button" value="Cancel" className="btn btn-secondary btn-lg" onClick={() => history.push("/")} >Cancel</button>
                        <button type="submit" value="Submit" className="btn btn-primary btn-lg" >Submit</button>
            </form>      
        </div>   
        </div>
    )
}


export default FillDeckForm;