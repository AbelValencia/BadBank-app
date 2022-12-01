import * as React from "react";
import { Card, Context } from "./context";

function Home(){
    return (
        <Card 
            bgcolor="primary"
            header= "BadBank Landing Page"
            title= "Welcome to BadBank!"
            text="You can use this bank to deposit and withdraw money."
            body={(<img src="bank1.png" className="img-fluid" alt="Responsive image"/>)}
        />
    );
}

export default Home;