import React from 'react';
import './List_jeton.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Greeter from '../artifacts/contracts/PUNFT_Global.sol/PUNFT_Global.json';
import Greeter1 from '../artifacts/contracts/PUBNFT_PU.sol/PUBNFT_PU.json';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Addresspayment = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';


function List_jeton() {
    const [listObject, setlistObject] = useState([]);
    const [nombreNFT, setnombreNFTFValue] = useState();
    const [account, setAccount] = useState([]);
    //fct connect wallet metamask avec user
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    var nbr;
    //var prix;
    useEffect(() => {
        fetchData();
        getAccounts();
    }, [])


    //recuperer le compte connecte
    async function getAccounts() {
        if (typeof window.ethereum !== 'undefined') {

            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts);
        }
    }
    //fct pour recuperer nbr NFT cree
    async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {

                var data = await contract.totalSupply();
                nbr = String(data);

                setnombreNFTFValue(String(data));
                fetchBF();
            }
            catch (err) {
                console.log(err);
            }
        }
    }

  /*  //return le prix de band
    async function setPrix(id) {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {

                var data = await contract.getPrixBF(id);
                
                prix = String(data);
                console.log(prix);
            }
            catch (err) {
                console.log(err);
            }
        }
    }*/
     

    //Acheter un band frequence
    async function setAcheter(id,prix) {
        if (typeof window.ethereum !== 'undefined') {
            //setPrix(id);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Addresspayment, Greeter1.abi, signer);
            console.log(prix);
            try {
                let overrider = {
                    from:account[0],
                    value: ethers.utils.parseEther(prix)
                  
                }
                const transaction = await contract.purchaseToken(id,overrider);
                await transaction.wait();
            
            } catch (err) {
                console.log(err);
            }
            
           
        }
    }


    //Publie un NFT
    async function setPublier(id) {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
            try {
                const transaction = await contract.publieband(account[0],Addresspayment, id);
                
                await transaction.wait(); 
                
            } catch (err) {
                console.log(err);
            }
        }
    }


    //fct recuperer les donner
    async function fetchBF() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {

                var sampleItems = [];
                for (let pas = 1; pas <= nbr; pas++) {

                    const data = await contract.getStartBF(pas);
                    const data1 = await contract.getEndtBF(pas);
                    const data2 = await contract.getLocalBF(pas);
                    const data3 = await contract.getPrixBF(pas);
                    var obj = {
                        id: pas, start_band: '' + data, end_band: '' + data1, local: '' + data2, prix: '' + String(data3)
                    };
                    sampleItems.push(obj);

                    /* const object = { "id": 4, "start_band": data, "end_band": data1, "local": data2, "prix": String(data3) };
                 setlistObject(object);
                 const data4 = await contract.getStartBF(5);
                 const data5 = await contract.getEndtBF(5);
                 const data6 = await contract.getLocalBF(5);
                 const data7 = await contract.getPrixBF(5);
                 const object2 = { "id": 5, "start_band": data4, "end_band": data5, "local": data6, "prix": String(data7) };
                 setlistObject1(object2);*/
                    //  setlistObject([sampleItems]);
                }

                setlistObject(sampleItems);
            }
            catch (err) {
                console.log(err);
            }

        }
    }

    /* const content = listObject.map(listObject =>
         (<tr key={listObject.id}>
                             <td>{listObject.id}</td>
                             <td>{listObject.start_band}</td>
                             <td>{listObject.end_band}</td>
                             <td>{listObject.local}</td>
                             <td>{listObject.prix}</td>
                             <td><button class="Donner">Donner</button></td>
                             <td><button class="Effacer">Effacer</button></td>
     </tr>
         )
         );
 */
    return (

        <div className="container">
            {fetchBF}
            <div className="cadre">
                <table class="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Start band frequence</th>
                            <th>fin band frequence</th>
                            <th>Localisation</th>
                            <th>Prix</th>
                            <th>Address PU</th>
                            <th></th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {listObject && listObject.map(l =>
                            <tr key={l.id}>
                                <td>{l.id}</td>
                                <td>{l.start_band}</td>
                                <td>{l.end_band}</td>
                                <td>{l.local}</td>
                                <td>{l.prix +" ETH"} </td>
                                <td></td>
                              
                                {
                                    account[0] === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" && <td><button onClick={() => setPublier(l.id)} class="Effacer">Publie</button></td>
                                }
                                {
                                    account[0] !== "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" && <td><button onClick={() => setAcheter(l.id,l.prix)} class="Donner">Acheter</button></td>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List_jeton;