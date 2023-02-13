import React from "react";
import styled from 'styled-components';

import Logo from "../img/pokeapi.png";

const Loader: React.FC = () => {

    return(
        <Spinner>
            <ImageWrapper>

            <Image className="App-logo" src={Logo} alt="PokeAPI"/>
            </ImageWrapper>
        </Spinner>
    )
}

export default Loader

const Spinner = styled.div`
height: 100vh;
width: 100vw;

position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,0.8);
    backdrop-filter: blur(6px);

`
const ImageWrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`
const Image = styled.img`
max-width: 10vw;
object-fit: contain;
`