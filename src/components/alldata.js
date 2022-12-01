import * as React from "react";
import {UserContext, Card} from "./context";

function AllData(){
    const ctx = React.useContext(UserContext);
    let sumDeposits = ctx.deposits.reduce((partialSum, a) => partialSum + a, 0);
    let sumWithdraws = ctx.withdraws.reduce((partialSum, a) => partialSum + a, 0);
    let accountBalance = sumDeposits-sumWithdraws

    for (let i = 0; i < ctx.deposits.length; i++) {
        console.log(i);
      }

    return (
        <Card 
            bgcolor = "dark"
            header= "All Data"
            body= {(
                <>
                <div>
                    <h6>Users:</h6><p>{JSON.stringify(ctx.users)}</p>
                    <h6>Deposits:</h6><p>{JSON.stringify(ctx.deposits)}</p>
                    <h6>Withdraws:</h6><p>{JSON.stringify(ctx.withdraws)}</p>
                    <h6>Account Balance:</h6><p>${accountBalance}</p>
                </div>
                </>
                )}
                />
            );
};


export default AllData;