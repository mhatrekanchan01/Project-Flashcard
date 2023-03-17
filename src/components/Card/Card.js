import { Switch, Route, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";
import { Link, useHistory, useParams, useEffect } from "react-router-dom";
import { readCard, updateCard, createCard } from "../../utils/api/index"
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Card(){
const {url, path} = useRouteMatch();
const {deckId} = useParams();
return (
    <div>

<Switch>
    <Route exact path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
      </Switch>
       </div>
)
}


export default Card;