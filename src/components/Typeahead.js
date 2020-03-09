import React from 'react';
import styled from 'styled-components';
import {categories} from '../data'

const Entry = ({book, input}) => {
    let split = book.title.indexOf(input) + input.length;
    let genre = categories[book.categoryId].name;
    return (
        <>
        <span>{book.title.slice(0, split)}</span>
        <StyledPrediction>{book.title.slice(split)}</StyledPrediction>
        <StyledCategory><span> in</span> {genre}</StyledCategory>
        </>
    )
}

const Suggester = ({list, input, handleSelect, selectedIndex}) => {
    if(input.length >1){
        return (
            <ul>
                {list.map(book => {
                    return (
                        <li 
                        key={book.id}
                        onClick={() => handleSelect(book.title)}
                        >
                        <Entry book={book} input={input} />
                    </li>
                )})}
            </ul>
        )
    } else { return ''}
;}

// const isSelected = () => {

// }

const TypeAhead = ({books, handleSelect}) => {
    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [list, setList] = React.useState([]);

    const renderList = (input) => {
        if(input.length > 1){
            let filteredList = (books.filter(bookyy => {
            return bookyy.title.toLowerCase().includes(input.toLowerCase())
            }))
            console.log('filteredList',filteredList);
            setList(filteredList);
        } else { return ''}
    }

    return(
        <StyledBox>
            <StyledInput 
            type='text'
            value={value}
            onChange={ev => {
                setValue(ev.target.value); 
                renderList(ev.target.value);
            }}
            onKeyDown={ev => {
                switch (ev.key) {
                    case 'Enter': {
                        handleSelect(ev.target.value);
                        return;
                    }
                    case 'ArrowUp': {
                        setSelectedIndex(selectedIndex - 1)
                        break;
                    }
                    case 'ArrowDown': {
                        setSelectedIndex(selectedIndex + 1)
                        break;
                    }
                    default:
                }}
            }
            />
            <StyledButton onClick={() => setValue('')}>
                Clear
            </StyledButton>
            
            <Suggester 
            list={list} 
            input={value}
            handleSelect={handleSelect}
            selectedIndex={selectedIndex}
            
            />
            
        </StyledBox>
    )
};





const StyledBox = styled.div`
    width: 100%;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    background: whitesmoke;
    
    li {
        padding: .3rem;
        &:hover{
            cursor: pointer;
            background: slateblue;
            color: whitesmoke;
        }
    }
    ul {
        box-shadow: 5px 5px 5px lightgrey;
        list-style-type: none;
        width: 40vw;
        margin: 0 auto;
    }
`;

const StyledPrediction = styled.span`
    font-weight: bold;
`;
const StyledCategory= styled.span`
    color: lime;
    font-style: italic;
    font-size: .75rem;
    span {
        color: black;
    }
`;

const StyledInput = styled.input`
    border: 1px solid lightgray;
    border-radius: 3px;
    margin: .5rem;
    padding: .5rem 1rem;

`;

const StyledButton = styled.button`
    background: slateblue;
    border: none;
    color: whitesmoke;
    border-radius: 3px;
    padding: .5rem 1rem;

`;




export default TypeAhead;