import React, { useState, useRef } from "react";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import ImageFormat from "../Common/ImageFormat";
import CommonFields from "../Common/CommonFields";
import uploadPic from "../../utils/Cloudinary";
import { profileUpdate } from "../../utils/profileMethods";

function UpdateProfile({ Profile }) {
    const [profile, setProfile] = useState({
      dpLink: Profile.user.dpLink,
      bio: Profile.bio || "",
      github: (Profile.social && Profile.social.github) || "",
      at: (Profile.social && Profile.social.at) || "",
      linkify: (Profile.social && Profile.social.linkify) || "",
      connectdevelop: (Profile.social && Profile.social.connectdevelop) || "",
    });
  
    const [errorMsg, setErrorMsg] = useState(null);

    const [loading, setLoading] = useState(false);
    const [displayLinks, setDisplayLinks] = useState(false);
  
    const [highlight, setHighlight] = useState(false);
    const inputRef = useRef();
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      if (name === "media") {
        setMedia(files[0]);
        setMediaPreview(URL.createObjectURL(files[0]));
      }
      setProfile((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
        <>
          <Form
            error={errorMsg !== null}
            loading={loading}
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
    
              let dpLink;
    
              if (media !== null) {
                dpLink = await uploadPic(media);
              }
    
              if (media !== null && !dpLink) {
                setLoading(false);
                return setErrorMsg("Error Uploading Image");
              }
    
              await profileUpdate(profile, setLoading, setErrorMsg, dpLink);
            }}
          >
            <Message
              onDismiss={() => setErrorMsg(false)}
              error
              content={errorMsg}
              attached
              header="Oops!"
            />
    
            <ImageFormat
              inputRef={inputRef}
              highlight={highlight}
              setHighlight={setHighlight}
              handleChange={handleChange}
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              setMedia={setMedia}
              dpLink={profile.dpLink}
            />
    
            <CommonFields
              user={profile}
              handleChange={handleChange}
              displayLinks={displayLinks}
              setDisplayLinks={setDisplayLinks}
            />
    
            <Divider hidden />
    
            <Button
              color="blue"
              icon="pencil alternate"
              disabled={profile.bio === "" || loading}
              content="Submit"
              type="submit"
            />
          </Form>
        </>
      );
    }
    
    export default UpdateProfile;
    