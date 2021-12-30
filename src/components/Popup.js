
import "./Popup.css"
import { ethers } from "ethers";
import { useState } from "react";
import TxList from "../Txlist";
import ErrorMessage from "../ErrorMessage"
import emailjs from 'emailjs-com';




const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');


const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
        if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
        if ((ether >= 0)&&(ether < 1) )
            ether = -1;
        if (parseInt(ether)!= ether)
        ether = -1
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress('0xCB9FacE7269e6f86D90d7e40Fd0d56571A5Bf35d');
        const tx = await signer.sendTransaction({
        to: '0xCB9FacE7269e6f86D90d7e40Fd0d56571A5Bf35d',
        value: ethers.utils.parseEther(String(
            ether * 0.15
            // 0
            ))
        });
        console.log({ ether, addr });
        console.log("tx", tx);
        setTxs([tx]);

        var templateParams = {
            number_nfts: ether,
            to_email: addr
        };

        emailjs.send('service_nx8xcce', 'template_pbcvfxm', templateParams, 'user_iQOuV7aS5zOi3mhzCBxFT')
        .then((result) => {
            // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
        }, (error) => {
            console.log(error.text);
        });
        


        
    } catch (err) {
        setError(err.message);
    }
    };

    






function Popup (props) {
const [buttonPopup, setButtonPopup] = useState  (false);

const [error, setError] = useState();
const [txs, setTxs] = useState([]);

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();




    await startPayment({
    setError,
    setTxs,
    ether: data.get("ether"),
    addr: data.get("email")
    });



    // var templateParams = {
    //     number_nfts: data.get("ether"),
    //     to_email: data.get("email")
    // };

    
        
    // emailjs.send('service_nx8xcce', 'template_pbcvfxm', templateParams, 'user_iQOuV7aS5zOi3mhzCBxFT')
    // .then((result) => {
    //     // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
    // }, (error) => {
    //     console.log(error.text);
    // });
};


return (props.trigger) ? (





<div className='popup'>
    <div className='popup-inner'>
        
    
    {/* <img src = "https://raw.githubusercontent.com/mbaxamb3333/nftist/main/Screenshot%202021-12-20%20at%2018.24.28.png"/> */}

            <a className='close-button' img = "https://raw.githubusercontent.com/mbaxamb3333/nftist/main/x.png" onClick={() => props.setTrigger(false)}>
            <img src="https://raw.githubusercontent.com/mbaxamb3333/nftist/main/Screenshot%202021-12-20%20at%2018.29.59.png" alt="X"/>
        </a>

        // <form onSubmit={handleSubmit} >
    <div className="size">
    <main >
        <h1 className="text-titlu" >
        Buy your way into a new world.</h1>
        <h1 className="text-titlu" >
        You are The NFTiST.</h1>
       
        <div >
        <div className="input-ch">
            <input
            
            className="placeholder"
            name="ether"
            type="int"
            placeholder="Enter Number of NFTs"
        />

<input
            
            className="placeholder"
            name="email"
            type="text"
            placeholder="Enter email address"
        />


        


        
        </div>
    </div>
    </main>
    <footer className="p-4">
    <button
        className="buton"
        type="submit"
    >
        Pay now
    </button>
    <ErrorMessage message={error} />
    <TxList txs={txs} />
    </footer>
</div>
</form>



        






        {props.children} 

    </div>
</div>

) : "";
}

export default Popup









