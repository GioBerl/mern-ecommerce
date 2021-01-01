import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
    return (
        // dovrebbe rimanere generico
        <Alert variant={variant}>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{children}</p>
        </Alert>
    );
}

Message.defaultProps = {
    variant: "info",
};

export default Message;
