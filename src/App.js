import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Quote from './components/Quote'
import axios from 'axios'

const Container = styled.div`
max-width: 900px;
margin: 0 auto;
@media (min-width: 992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;


function App() {
  const [currency, saveCurrency] = useState('')
  const [cryptocurrency, saveCrpytocurrency] = useState('')
  const [result, saveResult] = useState({})
  const [loading, saveLoading] = useState(false)

  useEffect(() => {

    const quoteCryptocurrency = async () => {

      if (currency === '') return

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;

      const result = await axios.get(url)

      saveLoading(true)

      setTimeout(() => {
        saveLoading(false)
        saveResult(result.data.DISPLAY[cryptocurrency][currency])
      }, 3000)

    }
    quoteCryptocurrency()

  }, [currency, cryptocurrency])

  const component = (loading) ? <Spinner /> : <Quote result={result} />

  return (
    <Container>
      <div>
        <Image src={imagen} alt="imagen cripto" />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario saveCurrency={saveCurrency} saveCrpytocurrency={saveCrpytocurrency} />

        {component}
      </div>
    </Container>
  );
}

export default App;
