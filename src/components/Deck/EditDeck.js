import React from "react";
import { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api/index"
import { Link, useHistory, useParams } from "react-router-dom";

function EditDeck(){
    const {deckId} = useParams();
    console.log(deckId);
    const history = useHistory();
    
    const initialDeckState = {
        name: "",
        description: "",
    };
    const [deckEdit, setDeckEdit] = useState(initialDeckState);
    
    function handleChange({ target }) {
        setDeckEdit({
            ...deckEdit,
            [target.name]: target.value,
        });
    }

    useEffect(() => {
        const abortController = new AbortController();
        async function editDeck(){
          try{
            const fetch = await readDeck(deckId);
            setDeckEdit(fetch);
          console.log(fetch);
          }catch(error){
            console.log("Sorry something went wrong", error);
          }
          return () => {
            abortController.abort();
        } 
      };
      
      editDeck()
      
      }, [deckId])

     

      async function handleSubmit(event) {
        event.preventDefault();
        const response = await updateDeck({...deckEdit});
        console.log(response);
        setDeckEdit({...response});
    }
    console.log(deckEdit);
    return (
        <div> 
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <Link onClick={() => history.push("/")}>
                  Home
                </Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
        <div>
            <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit} >
                
                            <div className="form-group" >
                                <label htmlFor="name" for="exampleFormControlInput1">Name</label>
                                    <input
                                    id="exampleFormControlInput1"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    className="container-fluid"
                                   value={deckEdit.name}    
                                    />   
                            </div>    
                            <div className="form-group">
                                <label htmlFor="description" for="exampleFormControlTextarea1">Description</label>
                                    <textarea
                                    id="exampleFormControlTextarea1"
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    className="container-fluid" rows="3"
                                    value={deckEdit.description}
                                />  
                            </div>                           
                        <button type="button" value="Cancel" className="btn btn-secondary btn-lg" onClick={() => history.push("/")} >Cancel</button>
                        <button type="submit" value="Submit" className="btn btn-primary btn-lg" >Submit</button>              
            </form>            
        </div>
        
        </div>

    )
}

export default EditDeck;