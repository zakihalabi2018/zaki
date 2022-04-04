import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import './App.css';
import Home from './page/Home';
import Acceder from './page/Acceder';
import Cree_un_jeton from './page/Cree_un_jeton';
import Cree_un_jeton_location from './page/Cree_un_jeton_loc';
import List_jeton_location from './page/List_jeton_loc';
import List_jeton from './page/List_jeton';
import { useState, useEffect } from 'react';


function App() {
    const [account, setAccount] = useState([]);

    useEffect(() => {
        getAccounts();
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    async function getAccounts() {
        if (typeof window.ethereum !== 'undefined') {

            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts);
        }
    }


    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                 <Route path='/' exact component={Home} />
                    {account[0] === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" && <Route path='/Cree_un_jeton' component={Cree_un_jeton} />
                    }
                    {account[0] !== "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" && <Route path='/Cree_un_jeton' component={Acceder} />
                    }
                    <Route path='/Cree_un_jeton_location' component={Cree_un_jeton_location} />
                    <Route path='/List_jeton_location' component={List_jeton_location} />
                    <Route path='/List_jeton' component={List_jeton} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
