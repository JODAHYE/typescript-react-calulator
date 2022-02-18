import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
    background: #6922DE;
    display: inline-block;
    margin: 0 auto;
    width: 500px;
    padding: 40px 20px;
    border-radius: 30px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
`;
const Input = styled.input`
    width: 80%;
    font-size: 20px;
    padding: 10px;
    outline: none;
    background: rgba(255, 255, 255, 0.4);
    margin-bottom: 16px;
    border: none;
`;

const Row = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;
const Button = styled.button`
    width: calc(100%/2);
    font-size: 24px;
    height: 80px;
    border: none;
    cursor: pointer;
    margin: 2px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    background: #fff;
    &:active{
        box-shadow: none;
    }
`;
const Calculator: React.FC = () => {
    const [value,  setValue] = useState<string>('');
    
    useEffect(()=>{
        console.log(value);
    },[value]);

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        if(e.target instanceof HTMLButtonElement){
            setValue(value+e.target.innerHTML);
        }
    }

    const onRemove = () => {
        setValue(prev=>prev.slice(0, -1));
    }

    const onResult = () => {
        setValue('');
    }

    return (
        <Wrap>
            <Input type="text" value={value} />
            <Row>
                <Button onClick={onClick}>(</Button>
                <Button onClick={onClick}>)</Button>
                <Button onClick={onClick}>/</Button>
                <Button onClick={onResult}>=</Button>

            </Row>
            <Row>
                <Button onClick={onClick}>7</Button>
                <Button onClick={onClick}>8</Button>
                <Button onClick={onClick}>9</Button>
                <Button onClick={onClick}>*</Button>
            </Row>
            <Row>
                <Button onClick={onClick}>4</Button>
                <Button onClick={onClick}>5</Button>
                <Button onClick={onClick}>6</Button>
                <Button onClick={onClick}>-</Button>
            </Row>
            <Row>
                <Button onClick={onClick}>1</Button>
                <Button onClick={onClick}>2</Button>
                <Button onClick={onClick}>3</Button>
                <Button onClick={onClick}>+</Button>
            </Row>
            <Row>
                <Button onClick={onClick}>0</Button>
                <Button onClick={onClick}>.</Button>
                <Button onClick={onRemove}>Del</Button>
            </Row>
        </Wrap>
    );
};

export default Calculator;