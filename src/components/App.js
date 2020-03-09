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
    margin: 0;
`;




export default App;
