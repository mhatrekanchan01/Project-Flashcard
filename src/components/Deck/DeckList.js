import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../../utils/api/index"
import { useHistory, Link } from "react-router-dom";


function DeckList(){
    
const history = useHistory();
const [deckListing, setDeckListing] = useState([]);
    
useEffect(() => {

async function deckDashBoard(){
const fetch = await listDecks();
 setDeckListing(fetch);  
}
deckDashBoard();
}, [])

    //const deleteDeck = (indexToDelete) => {
      //  setDeckListing((currentDeck) => currentDeck.filter((post, id) => id !== indexToDelete))
   // }

console.log(deckListing);
   
   
    function DeckMap(){
        return (deckListing.map((currentDeck, index) => {
           async function deleteHandler(){
                if(window.confirm(`Delete this deck? You will not be able to recover it`)){
                    history.go(0);
                    return await deleteDeck(currentDeck.id);
                }
               }
            return (
                <div>
                      <div className="row">  
                      <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                        <div>
                            <li key={index} style={{listStyle: "none"}}>
                                <div className="d-flex justify-content-between">
                                    <h3>{currentDeck.name}</h3>
                                
                               <p> {`${currentDeck.cards.length}`} cards </p>
                                </div>
                            </li>
                                  <div className="card-text">
                                    <p>{`${currentDeck.description}`}</p>
                                  </div>   
                        </div>
                        <div class="d-flex justify-content-between">
                                <div>
                                      <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">View</Link> 
                                      <Link to={`/decks/${currentDeck.id}/study`} type="button" className="btn btn-primary">Study</Link>
                                </div>
                                <div>
                                      <button onClick={deleteHandler} className="btn btn-danger">Delete</button>
                                </div>
                        </div>
                        </div>
                        </div>    
                        </div>     
                  </div>
                  </div>
              )     
         } )
         )}

     

    return (
        <div><DeckMap /></div>
                
    )
        
}


export default DeckList;