
import React from "react";
import { Link } from "react-router-dom";

function CreateDeckButton(){
  
    return ( 
        <div>
            <div className="row">
                <div className="col-sm-6 mb-1">
                    <Link to="/decks/new" className="btn btn-outline-primary" ><strong>+ Create Deck</strong></Link>
                </div>
            </div>         
            </div>
    )

}

export default CreateDeckButton;