import React from "react";
import { Form} from "semantic-ui-react";
import{useRouter} from "next/router";

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
            onClick ={()} => inputRef.current.click()}
            size="huge"
            centered
    );
        </span>
}