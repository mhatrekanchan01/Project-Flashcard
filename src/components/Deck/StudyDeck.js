import React from "react";
import { useEffect, useState } from "react";
import { readDeck } from "../../utils/api/index"
import { Link, useHistory, useParams } from "react-router-dom";

function StudyDeck(){
    const history = useHistory();
    const { deckId } = useParams();
    const [deckView, setDeckView] = useState({});
    const [cardList, setCardList] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const [front, setFront] = useState(false);
    
    useEffect(() => {
        const abortController = new AbortController();
        async function singleDeck(){
          try{
            const fetch = await readDeck(deckId);
            setDeckView(fetch);
            setCardList(fetch.cards);
          console.log(fetch);
          console.log(fetch.cards);
          }catch(error){
            console.log("Sorry something went wrong", error);
          }
          return () => {
            abortController.abort();
        } 
      };
      
      singleDeck()
      
      }, [deckId])
      
      const flipCard = () => setFront(!front);
      
      function handleNext(){      
            setCardNumber((currentCard) => 
            currentCard < (cardList.length - 1) 
            ? currentCard + 1 
            : (window.confirm("Restart Cards") 
                    ? currentCard === 0
                    : history.push("/")
                )
                        );
            
      }

      function handlePrevious() {
        setCardNumber((currentCard) => currentCard - 1);
        
      }

     if(cardList.length < 3){
        return (<div>
            <div>
              <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                        <Link onClick={() => history.push("/")}>
                          Home
                        </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{deckView.name}</li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                        </ol>
                    </nav>
              </div>
                <div>
                  <h1>{deckView.name} : Study</h1>
                </div> 
                  <div class="container">
                       <h2>Not Enough Cards</h2>
                       <div>
                        <p>You need at least three cards to Study</p>
                        <p>There are {cardList.length} in this deck</p>
                       </div>
                  </div>
                  <button type="button" onClick={() => history.push(`/decks/${deckView.id}/cards/new`)} className="btn btn-primary">Add Cards</button>
  
                  </div>);
          
     }else{
        return (
          <div>
            <div>
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">{deckView.name}</li>
                      <li className="breadcrumb-item active" aria-current="page">Study</li>
                  </ol>
              </nav>
              </div>
              <h1>Study: {deckView.name}</h1>
              <div class="row">
                <div class="col-sm-12 p-0">
                  <div class="card">
                    <div class="card-body">
                      <div class="container">
                        <h3>Card {cardNumber + 1} of {cardList.length}</h3>  
                      <p>{front ? cardList[cardNumber].description : cardList[cardNumber].name}</p> 
                            <button onClick={flipCard}>Flip</button>
                            {front && <button onClick={handleNext}>Next</button>}   
                            {cardNumber !==0  && <button onClick={handlePrevious}>Previous</button>}  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              </div>
            )
        }
}

export default StudyDeck;