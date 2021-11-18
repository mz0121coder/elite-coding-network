import React, { useState, useEffect, useRef } from "react";
import {
  List,
  Divider,
  Message,
  Checkbox,
  Form,
  Button,
} from "semantic-ui-react";
import { pwUpdate, toggleMsgAlert } from "../../utils/profileMethods";

function Settings({ newMessageAlert }) {
    const [passwordFields, showPasswordFields] = useState(false);
  
    const [newMessageSettings, showNewMessageSettings] = useState(false);
  
    const isFirstRun = useRef(true);
    const [popupSetting, setPopupSetting] = useState(newMessageAlert);
  
    const [success, setSuccess] = useState(false);
  
    function Settings({ newMessageAlert }) {
        const [passwordFields, showPasswordFields] = useState(false);
      
        const [newMessageSettings, showNewMessageSettings] = useState(false);
      
        const isFirstRun = useRef(true);
        const [popupSetting, setPopupSetting] = useState(newMessageAlert);
      
        const [success, setSuccess] = useState(false);
      
        return (
            <>
              {success && (
                <>
                  <Message success icon="check circle" header="Updated Successfully" />
                  <Divider hidden />
                </>
              )}
        
              <List size="huge" animated>
                <List.Item>
                  <List.Icon name="user secret" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header
                      onClick={() => showPasswordFields(!passwordFields)}
                      as="a"
                      content="Update Password"
                    />
                  </List.Content>
        
                  {passwordFields && (
                    <UpdatePassword
                      setSuccess={setSuccess}
                      showPasswordFields={showPasswordFields}
                    />
                  )}
                </List.Item>
                <Divider />
        
                <List.Item>
                  <List.Icon
                    name="paper plane outline"
                    size="large"
                    verticalAlign="middle"
                  />
        
                  <List.Content>
                    <List.Header
                      onClick={() => showNewMessageSettings(!newMessageSettings)}
                      as="a"
                      content="Show New Message Popup?"
                    />
                  </List.Content>
        
                  <div style={{ marginTop: "10px" }}>
                    Control whether a Popup should appear when there is a New Message or
                    not.
                    <br />
                    <br />
                    <Checkbox
                      checked={popupSetting}
                      toggle
                      onChange={() =>
                        toggleMsgAlert(popupSetting, setPopupSetting, setSuccess)
                      }
                    />
                  </div>
                </List.Item>
        
                <Divider />
              </List>
            </>
          );
        }
        
        const UpdatePassword = ({ setSuccess, showPasswordFields }) => {
            const [loading, setLoading] = useState(false);
            const [errorMsg, setError] = useState(null);
          
            const [userPasswords, setUserPasswords] = useState({
              currentPassword: "",
              newPassword: "",
            });
            const [typed, showTyped] = useState({
              field1: false,
              field2: false,
            });
          
            const { field1, field2 } = typed;
          
            const { currentPassword, newPassword } = userPasswords;
          
            const handleChange = (e) => {
              const { name, value } = e.target;
              setUserPasswords((prev) => ({ ...prev, [name]: value }));
            };
          
            useEffect(() => {
              errorMsg && setTimeout(() => setError(null), 5000);
            }, [errorMsg]);
          