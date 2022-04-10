import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Cree_un_jeton.css';
import Greeter from '../artifacts/contracts/PUNFT_SU.sol/PUNFT_SU.json';
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const greeterAddressPU = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';;
function Cree_un_jeton_loc() {

    const [StartBF, setStartBFValue] = useState();
    const [EndBF, setEndBFValue] = useState();
    const [localisation, setlocalValue] = useState();
    const [prix, setPrixValue] = useState();
    const [ID, setIDValue] = useState();

    useEffect(() => {
        //  fetchGreeting();
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    /*
        async function fetchGreeting() {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
                try {
                    const data = await contract.greet();
                    const data1 = await contract.setBF();
                    const data2 = await contract.setLo();
                    const data3 = await contract.setPri();
                    setStartBFValue(data);
                    setEndBFValue(data1);
                    setlocalValue(data2);
                    setPrixValue(data3);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    */

        const abi = [
            "constructor(address _nftAddress,uint256 tokenId,string memory namee, string memory symboll) ERC721Full(namee,symboll)",
            "function mint(string memory SBF, string memory EBF,uint price,string memory Location) public onlyOwner returns (uint256)"
          ];

    async function setGreeting() {

        if (!StartBF && !EndBF && !localisation && !prix) return
        if (typeof window.ethereum !== 'undefined') {

            async function deployClick (){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log("depoley th contract with :" + ID)
                //setIsNoClicked(true);
                const ticketContract = new ethers.ContractFactory(Greeter.abi,Greeter.bytecode,signer);
                console.log("new ethers.ContractFactory:" + ID)
                const ticket = await ticketContract.deploy(greeterAddress, ID, "NFTP", "NFTP");
                console.log("new ethers.deploye:" + ID)
                await ticket.deployed();
                console.log("Ticket Contract deployed to:", ticket.address);

              
                const contract = new ethers.Contract(ticket.address, Greeter.abi, signer);
                const transaction = await contract.mint(StartBF, EndBF, prix, localisation);
                setStartBFValue('');
                setEndBFValue('');
                setlocalValue('');
                setPrixValue('');
                await transaction.wait();
                console.log("this is exteed terl")
                return ticket.address;
            }

            deployClick().then(
                reponse => {
                    console.log("tHIS TERMIANTED");
                }
            ).catch(error =>   console.log("tHIS TERMIANTED" + error));

        }
    }

    return (
        <div className="container py-5">
            <div className="ccadre">
                <h1>Cree un jeton au SU</h1>
                <p>{StartBF} {localisation}</p><p>{EndBF}</p>
                <br></br>
                <form>
                    <div class="form-group">
                        <label for="start_band_fr">ID de Jeton</label>
                        <input class="form-control" onChange={e => setIDValue(e.target.value)} placeholder="Set ID" />
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="start_band_fr">Start bande de frequence</label>
                        <input class="form-control" onChange={e => setStartBFValue(e.target.value)} placeholder="Set Start band" />
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="end_band_fr">Fin bande de frequence</label>
                        <input class="form-control" onChange={e => setEndBFValue(e.target.value)} placeholder="Set END bande frequence" />
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="localisation_PU">La localisaion De PU</label>
                        <input class="form-control" onChange={e => setlocalValue(e.target.value)} placeholder="Set Localisation" />
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="prix_band_fr">le Prix bande de frequence</label>
                        <input class="form-control" onChange={e => setPrixValue(e.target.value)} placeholder="Set Prix" />
                    </div>
                    <br></br>
                </form>
                <button type="submit" onClick={setGreeting} class="btn btn-primary">Cree jeton</button>
            </div>
        </div>
    );
}

export default Cree_un_jeton_loc;



