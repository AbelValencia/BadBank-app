import * as React from "react";
import {UserContext, Card} from "./context";
// database
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update, DataSnapshot } from "firebase/database";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    const ctx = React.useContext(UserContext);

    let sumDeposits = ctx.deposits.reduce((partialSum, a) => partialSum + a, 0);
    let sumWithdraws = ctx.withdraws.reduce((partialSum, a) => partialSum + a, 0);
    let accountBalance = sumDeposits-sumWithdraws
       

    let empty = false;
    if(deposit.length === 0){
        empty = true;
    };

    function validate(field, label){
        if(!field){
            setStatus('Error: ' + label);
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        if(isNaN(deposit)){
            setStatus('Error: ' + 'Your input should be a number');
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        if(parseFloat(deposit) < 0){
            setStatus('Error: ' + 'You can not deposit a negative amount');
            setTimeout(()=> setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function handleDeposit(){
        if(!validate(deposit, 'deposit')) return;
        setShow(false);  
        ctx.deposits.push(parseFloat(deposit))
        
    }

    function clearForm(){
        setDeposit('');
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
            bgcolor = "success"
            txtcolor="black"
            header= "Deposit"
            status= {status}
            body={show ? (
                <>
                    <h2>
                    Account Balance: ${accountBalance}
                    </h2>                       
                    <br/>
                    Deposit Amount<br/>
                    <input  className="form-control" id="password" placeholder="Deposit Amount" value={deposit} onChange={(e) => {
        setDeposit(e.currentTarget.value)}}/><br/>
                    <button type="submit" className="btn btn-light" onClick={handleDeposit}
                    disabled ={empty}
                    >Deposit</button>
                </>
            ):(
                <>
                    <h5>Success</h5>
                    <p>Your deposit was received!</p>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Confirm</button>
                </>
            )}
        />
    )
}

export default Deposit;