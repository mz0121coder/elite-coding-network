import React from "react";
import {Form, Button, TextArea, Divider} from "semantic-ui-react"

function CommonFields ({
    user: {bio, github, linkify, at, connectdevelop},
    handleChange,
    displayLinks,
    setDisplayLinks,

}) {

    return (
     <>
        <Form.Field
        required
        control ={TextArea}
        name = "bio"
        value ={bio}
        onChange={handleChange}
        placeholder="bio"
        />

        <Button
        content="Add Social Links"
        color="red"
        icon="at"
        type="button"
        onClick={() => setDisplayLinks(!displayLinks)} 
        />

        {displayLinks && (
            <>
            <Divider />
            <Form.Input
            icon="github"
            iconPosition="left"
            name="github"
            value={github}
            onChange={handleChange}
            />

            <Form.Input
            icon="connectdevelop"
            iconPosition="left"
            name="connectdevelop"
            value={connectdevelop}
            onChange={handleChange}
            />
            
            <Form.Input
            icon="linkify"
            iconPosition="left"
            name="linkify"
            value={linkify}
            onChange={handleChange}
            />

            <Form.Input
            icon="at"
            iconPosition="left"
            name="at"
            value={at}
            onChange={handleChange}
            />
            
            <Message
            icon="attention"
            info
            size = "small"
            header = "Social Media Links Are Optional!"
            />
            </>
        )}
        </>
    );
        }
