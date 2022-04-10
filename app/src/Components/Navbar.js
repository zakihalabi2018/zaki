import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import image from "./Images/l'autoritaire.jpg";
import image1 from "./Images/PU.jpg";
import { ethers } from 'ethers';
import Greeter from '../artifacts/contracts/PUNFT_Global.sol/PUNFT_Global.json';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [nombreNFT, setnombreNFTFValue] = useState();
    const showSidebar = () => setSidebar(!sidebar);
    const [account, setAccount] = useState([]);
    const [SelectedAccount, setSelectedAccount] = useState([]);
    
    async function getAccounts() {
        if (typeof window.ethereum !== 'undefined') {

            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts);
        }
    }
    async function getAccountSelected() {
        if (typeof window.ethereum !== 'undefined') {
            getAccounts()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const r = await setSelectedAccount(await signer.getAddress());
            console.log("test tmp: " + ('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' === await signer.getAddress()));
            console.log("test : " + ('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' === SelectedAccount));
        }
    }

    useEffect(() => {
        fetchData();
        getAccounts();
        getAccountSelected();
    }, [])

    async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
            try {
                const data = await contract.totalSupply();
                setnombreNFTFValue(String(data));

            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>

                <div className="navbar">

                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' === SelectedAccount && <img src={image} alt=""/>}
                    {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' !== SelectedAccount && <img src={image1} alt="" />}

                    {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' === SelectedAccount && <h4>Autoritaire : {SelectedAccount}</h4>}
                    {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' !== SelectedAccount && <h4>PU : {SelectedAccount}</h4>}


                    {'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' === SelectedAccount && <h5>le Nombre NFT cree: {nombreNFT}  NFT</h5>}

                    <button className="Deconnecte"><span>Deconnecte</span></button>

                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;