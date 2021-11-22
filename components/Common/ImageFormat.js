import React from "react";
import { Form} from "semantic-ui-react";
import{useRouter} from "next/router";
import e from "express";

function ImageFormat ({
    highlight,
    setHighlight,
    inputRef,
    handleChange,
    mediaPreview,
    setMedia,
    dpLink,
})  {
    const router =useRouter ();

    const signupRoute = router.pathname === "/signup";

    const checkForSignupPage = () =>
    signupRoute ? (
        <>
        <Header icon>
            <icon
            name="file image outline"
            style={{ cursor: "pointer"}}
            onClick={() => inputRef.current.click ()}
            size = "huge"
            />
            Drag n Drop or Click to upload image
        </Header>
        </>
    )  :(
        <span style = {{ textAlign: "center"}}>
            <Image
            src ={dpLink}
            alt="Profile picture"
            style = {{cursor: "pointer"}}
            onClick ={() => inputRef.current.click()}
            size="huge"
            centered
            />
            Drag n Drop or Click to upload image
        </span>
    );

    return (
        <>
        <Form.field>
            <Segment placeholder basic secondary>
                <input
                style = {{ display: "none"}}
                type= "file"
                accept = "image/*"
                onChange={handleChange}
                name="media"
                ref={inputRef}
                />

                <div
                onDragOver={(e)} => {
                    e.preventDefault ();
                    setHighlight(true);
                }}
                onDragLeave={{e}} => {
                    e.preventDefault ();
                    setHighlight(false);
                }}
                onDragDrop={{e}} => {
                    e.preventDefault ();
                    setHighlight(true);

                    const droppedFile = Array.from (e.dataTransfer.files);
                    setMedia(droppedFile[0]);
                    setMediaPreview(URL.createObjectURL (droppedFile[0]));
                }}
                >
                
            </Segment>
        </Form.field>

}