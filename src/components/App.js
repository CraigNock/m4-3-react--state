import React from 'react';
import Typeahead from './Typeahead';
import data from '../data';
import styled from 'styled-components';

function App(props) {
    
    return (
        <>
        <StyledWrapper>
            <Typeahead
                books= {data.books}
                handleSelect= {book => {
                    window.alert(book)
                }}
            />
        </StyledWrapper>
        </>

    )
}


const StyledWrapper = styled.div`
    height: 100%;
    margin: 0;
    padding: 0;
`;




export default App;
