import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import useCurrency from '../hooks/useCurrency'
import useCryptocurrency from '../hooks/useCryptocurrency'
import Error from './Error'


const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }

`

const Formulario = ({ saveCurrency, saveCrpytocurrency }) => {

    const [cryptList, saveCriptocurrencies] = useState([])
    const [error, saveError] = useState(false)

    const currencies = [
        { code: 'USD', name: 'Dolar de Estados Unidos' },
        { code: 'MXN', name: 'Peso Mexicano' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GDP', name: 'Libra Esterlina' }
    ]

    const [currency, SelectCurrency] = useCurrency('Elige tu moneda', '', currencies)

    const [cryptocurrency, SelectCrypto] = useCryptocurrency('Elige tu Criptomoneda', '', cryptList)

    useEffect(() => {
        const getAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const result = await axios.get(url);

            saveCriptocurrencies(result.data.Data);
        }
        getAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault()

        if (currency === '' || cryptocurrency === '') {
            saveError(true)
            return
        }

        saveError(false)
        saveCurrency(currency)
        saveCrpytocurrency(cryptocurrency)
    }


    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message="Todos los campos son obligatorios" /> : null}
            <SelectCurrency />
            <SelectCrypto />
            <Button type="submit" value="Calcular" />
        </form>


    )

}

export default Formulario
