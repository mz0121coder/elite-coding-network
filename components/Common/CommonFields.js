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

    )
}