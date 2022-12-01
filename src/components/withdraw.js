import * as React from "react";
import {UserContext, Card} from "./context";

// database
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";


function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');   
    const ctx = React.useContext(UserContext);

    let sumDeposits = ctx.deposits.reduce((partialSum, a) => partialSum + a, 0);
    let sumWithdraws = ctx.withdraws.reduce((partialSum, a) => partialSum + a, 0);
    let accountBalance = sumDeposits-sumWithdraws

    let empty = false;
    if(withdraw.length === 0){
        empty = true;
    };

    function validate(field, label){
        if(!field){
            setStatus('Error: ' + label);
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        if(withdraw > accountBalance){
            setStatus('Error: ' + 'you can not cash back more than $'+ accountBalance);
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        if(isNaN(withdraw)){
            setStatus('Error: ' + 'Your input should be a number');
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        if(withdraw > 3000){
            setStatus('Error: ' + 'You can not cash back more than $3000 per operation');
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function handleWithdraw(){
        if(!validate(withdraw, 'withdraw')) return;
        setShow(false);
        ctx.withdraws.push(parseFloat(withdraw))
    }

    function clearForm(){
        setWithdraw('');
        setShow(true);
        // write to db
        const id = (new Date).getTime();    
        set(ref(db, `/${id}`), {
        accountBalance,
        id,
        });
    }

    return (
        <Card 
            bgcolor = "dark"
            header= "Withdraw"
            status= {status}
            body={show ? (
                <>
                    <h2>Account Balance: ${accountBalance}</h2><br/>
                    Withdraw Amount<br/>
                    <input  className="form-control" id="Withdraw" placeholder="Withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}
                    disabled ={empty}
                    >Withdraw</button>
                </>
            ):(
                <>
                    <h5>Success</h5>
                    <p>Your withdraw was processed!</p>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Confirm</button>
                </>
            )}
        />
    )
}

export default Withdraw;