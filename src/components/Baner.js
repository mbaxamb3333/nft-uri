
function Banner (props) {
return (props.trigger) ? (
<section id="baner">

<div class="container">

    <div class="row">

        <div class="abner_left" class="wow fadeInUp" data-wow-duration="2s">

            <h1>WELCOME IN OUR EXCLUSIVE<br/>
                COMMUNITY. YOU ARE THE NFTiST. </h1>

            <h5>Support and Grow Together. </h5>

            {/* <a id="mint"class="mint">Buy NFTs</a> */}

            <button id = 'mint'className='mint' onClick={() => props.setTrigger(false)}>Buy NFTs</button>

    

        </div>

        <div class="baner_right">

            <img src="https://raw.githubusercontent.com/mbaxamb3333/nftist/main/NFTs.png" alt=""/>

        </div>

    </div>

</div>

</section>
) : "";
}

export default Banner


