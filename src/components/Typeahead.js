import React from 'react';
import styled from 'styled-components';
import {categories} from '../data'

const Entry = ({book, input, selected}) => {
    let split = book.title.toLowerCase().indexOf(input.toLowerCase()) + input.length;
    let genre = categories[book.categoryId].name;
    return (
        <>
        <span>{book.title.slice(0, split)}</span>
        <StyledPrediction>{book.title.slice(split)}</StyledPrediction>
        <StyledCategory><span> in</span> {genre}</StyledCategory>
        </>
    )
}

const Suggester = ({list, input, handleSelect, selectedIndex, setSelectedIndex}) => {
    if(input.length >1){
        return (
            <ul>
                {list.map((book, index) => {
                    let selected = (selectedIndex === index)? true : false;
                    
                    return (
                        <li 
                        onMouseEnter={() => setSelectedIndex(index)}
                        style={{
                            background: selected? 'slateblue' : 'transparent',
                            color: selected? 'whitesmoke' : 'black'
                        }}
                        key={book.id}
                        onClick={() => handleSelect(book.title)}
                        >
                        <Entry book={book} input={input} selected={selected} />
                        </li>
                    )
                })}
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

    const getList = (input) => {
        if(input.length > 1){
            let filteredList = (books.filter(book => {
            return book.title.toLowerCase().includes(input.toLowerCase())
            }))
            // console.log('filteredList',filteredList);
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
                getList(ev.target.value);
            }}
            onKeyDown={ev => {
                switch (ev.key) {
                    case 'Enter': {
                        handleSelect(list[selectedIndex].title);
                        console.log('beef ' +selectedIndex);
                        return;
                    }
                    case 'ArrowUp': {
                        setSelectedIndex(selectedIndex > 0? selectedIndex - 1 : selectedIndex);
                        break;
                    }
                    case 'ArrowDown': {
                        setSelectedIndex(selectedIndex < list.length -1 ? selectedIndex + 1 : selectedIndex)
                        break;
                    }
                    ///case escape, toggle a state that affects display of ul?
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
            setSelectedIndex={setSelectedIndex}
            />
            
        </StyledBox>
    )
};





const StyledBox = styled.div`
    width: 100%;
    height: 100vh;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    background-image: linear-gradient(to top, palegreen, whitesmoke);
    
    
    li {
        padding: .3rem;
        border-radius: 3px;
        /* &:hover{
            cursor: pointer;
            background: slateblue;
            color: whitesmoke;
        } */
    }
    ul {
        box-shadow: 0px 0px 5px lightgrey;
        list-style-type: none;
        width: 40vw;
        margin: 0 auto;
        padding: 0;
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
    margin: 1.5rem .5rem .5rem;
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