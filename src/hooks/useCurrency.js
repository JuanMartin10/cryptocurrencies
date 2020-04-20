import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Sel = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCurrency = (label, initalState, options) => {

    const [state, setState] = useState(initalState)

    const Select = () => (
        <Fragment>
            <Label>{label}</Label>
            <Sel
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="--">--Seleccione--</option>
                {options.map(elm => (<option key={elm.code} value={elm.code} >{elm.name} </option>))}

            </Sel>
        </Fragment >

    )

    return [state, Select, setState]
}

export default useCurrency
