
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import React from "react";
import CreateDeckButton from "../components/Deck/CreateDeckButton";
import DeckList from "../components/Deck/DeckList";
import FillDeckForm from "../components/Deck/FillDeckForm";
import SingleDeckView from "../components/Deck/SingleDeckView";
import Card from "../components/Card/Card";
import AddCard from "../components/Card/AddCard";
import EditDeck from "../components/Deck/EditDeck";
import StudyDeck from "../components/Deck/StudyDeck";
import EditCard from "../components/Card/EditCard";

function Layout() {

  


  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
    <Switch>
        <Route exact path={"/"}>
          <CreateDeckButton />
          <DeckList />
        </Route> 
   
        <Route exact path={"/decks/new"}>
          <FillDeckForm/>
        </Route> 

        <Route exact path="/decks/:deckId">
          <SingleDeckView />
         </Route>

         <Route exact path="/decks/:deckId/study">
          <StudyDeck />
        </Route>

         <Route exact path="/decks/:deckId/edit">
          <EditDeck />
         </Route>

         <Route path="/decks/:deckId/cards/new">
          <Card />
         </Route>
        
         <Route path="/decks/:deckId/cards/:cardId/edit">
          <Card />
        </Route>

         <Route path="*">
          <NotFound />
         </Route>
         
        </Switch>  
        
      </div>
      </div>
  );
}

export default Layout;
