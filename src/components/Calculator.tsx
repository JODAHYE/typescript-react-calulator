import React, { useState } from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
    background: #54B2D3;
    display: inline-block;
    margin: 0 auto;
    width: 500px;
    padding: 40px 20px;
    border-radius: 30px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
    @media (min-width: 320px) and (max-width: 480px) {
        width: 95%;
    }
`;
const Input = styled.p`
    margin: 0 auto;
    min-height: 40px;
    width: 80%;
    overflow-x: auto;
    font-size: 20px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.4);
    margin-bottom: 16px;
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
    transition: .4s;
    &:active{
        box-shadow: 0 0 3px 3px rgba(255, 255, 255, 1);
    }
    @media (min-width: 320px) and (max-width: 480px) {
        height: 55px;
    }
`;
const Calculator: React.FC = () => {
    const [print, setPrint] = useState<string>('');
    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
            const eventTarget = e.target as HTMLElement;
            if(eventTarget.innerHTML===')'){
                let open=0;
                let close=1;
                for(let i=0; i<print.length; i++){
                    if(print[i]==='(') open++;
                    if(print[i]===')') close++;
                }
                if(open!==close){
                    alert('잘못된 입력입니다.');
                    return;    
                }
            }
            setPrint(prev=>prev+eventTarget.innerHTML);
    }

    const onRemove = (): void => {
        setPrint(prev=>prev.slice(0, -1));
    }

    const onResult = (): void => {
        const result = toPostfix(print);
        console.log('후위표기법: ', result?.join(' '));
        if(result){
            setPrint(String(calculate(result)));
        };
    }

    const convert = (str:string):string[] => {
        let result:Array<string> = [];
        let temp = '';
        for(let i=0; i<str.length; i++){
            while(str[i] && (!isNaN(parseFloat(str[i])) || str[i]==='.')){  //숫자거나 . 이면
                temp+=str[i];
                i++;
            }
            if(temp) result.push(temp); 
            if(str[i] && isNaN(parseFloat(str[i]))){ // 연산자이면
                result.push(str[i]);
                temp='';
            }
        }
        return result;
    } 

    const toPostfix = (infix:string) :string[] | undefined => {
        try{
            const infixArr = convert(infix);  //인자를 배열로 변경
            let stack = [];
            let result = [];
            const priority = (char:string) : number => {
                switch(char){
                    case '(':
                    case ')':
                        return 0;
                    case '+':  
                    case '-':
                        return 1;
                    case '*':
                    case '/':
                        return 2;
                    default: 
                        return -1;
                }
            }
            for(let i=0; i<infixArr.length; i++){
                if(!isNaN(parseFloat(infixArr[i]))){
                    result.push(infixArr[i]);  
                }else{
                    switch(infixArr[i]){
                        case '+': case '-': case '*': case '/':  
                            if(stack.length>0){
                                while(stack[stack.length-1]!==null && priority(infixArr[i]) <= priority(stack[stack.length-1])){
                                    result.push(stack.pop());
                                }    
                                if(priority(infixArr[i]) > priority(stack[stack.length-1])){
                                    stack.push(infixArr[i]);
                                }
                            }else{
                                stack.push(infixArr[i]);
                            } 
                            break;
                        case '(':
                            stack.push(infixArr[i]);
                            break;
                        case ')':
                            let c = stack.pop();
                            while(c!='('){
                                result.push(c);
                                c = stack.pop();
                            }    
                            break;
                        default:
                            break;
                    }
                } 
            }
            while(stack.length>0){
                result.push(stack.pop());
            }   
            return result as string[];    
        }catch(e){
            console.log(e);
            alert(`${e}!! 정확한 식을 입력해주세요`);
            window.location.replace("/");
            return;
        }
    }

    const calculate = (postfix: string[]) : number => {
        try{
            if(postfix && postfix.length>0){
                let stack:string[] = [];
                for(let i=0; i<postfix.length; i++){
                    if(!isNaN(parseFloat(postfix[i]))){ //숫자이면 넣음
                        stack.push(postfix[i]);
                    }else{
                        let b = parseFloat(stack.pop() as string);
                        let a = parseFloat(stack.pop() as string);
                        let value = 0;
                        switch(postfix[i]){
                            case '+':
                                value = a + b;
                                break;
                            case '-':
                                value = a - b;
                                break;
                            case '*':
                                value = a * b;
                                break;
                            case '/':
                                value = a / b;
                                break;
                            default:
                                break;
                        }
                        stack.push(String(value));
                    }
                }
                return parseFloat(stack[0]);    
            }else{
                return 0;
            }    
        }catch(e){
            alert(`${e}!! 정확한 식을 입력해주세요 calculate`);
            window.location.replace("/");
            return 0;
        }
    }

    return (
        <Wrap>
            <Input>{print}</Input>
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
                <Button onClick={()=>{setPrint('')}}>C</Button>
            </Row>
        </Wrap>
    );
};

export default Calculator;