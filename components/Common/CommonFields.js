import React from "react";

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
    )
}