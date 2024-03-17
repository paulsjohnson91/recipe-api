import React from 'react';
import {Container, Header, List} from 'semantic-ui-react';

const RecipeInstructions = ({ instructions }) => {
    // Split the comma-separated string into an array of instructions
    const instructionList = instructions.map(instruction => instruction.trim());

    return (
        <Container>
            <Header content="Instructions" />
            <List bulleted>
                {instructionList.map((instruction, index) => (
                    <List.Item key={index}>{instruction}</List.Item>
                ))}
            </List>
        </Container>
    );
};

export default RecipeInstructions;
