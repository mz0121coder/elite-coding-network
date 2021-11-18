import React from "react";
import { Menu } from "semantic-ui-react";

function ProfileTabs({
    activeComponent,
    handleComponent,
    numberOfFollowers,
    numberFollowing,
    userAccount,
    loggedUserFollowers,
  }) {
  
    return (
        <>
          <Menu pointing secondary>
            <Menu.Item
              name="profile"
              active={activeComponent === "profile"}
              onClick={() => handleComponent("profile")}
            />
    
            <Menu.Item
              name={`${numberOfFollowers} followers`}
              active={activeComponent === "followers"}
              onClick={() => handleComponent("followers")}
            />
    
            {userAccount ? (
              <>
                <Menu.Item
                  name={`${
                    loggedUserFollowers.following.length > 0
                      ? loggedUserFollowers.following.length
                      : 0
                  } following`}
                  active={activeComponent === "following"}
                  onClick={() => handleComponent("following")}
                />
    
                <Menu.Item
                  name="Update Profile"
                  active={activeComponent === "updateProfile"}
                  onClick={() => handleComponent("updateProfile")}
                />
    
                <Menu.Item
                  name="settings"
                  active={activeComponent === "settings"}
                  onClick={() => handleComponent("settings")}
                />
              </>
            ) : (
              <Menu.Item
                name={`${numberFollowing} following`}
                active={activeComponent === "following"}
                onClick={() => handleComponent("following")}
              />
            )}
          </Menu>
        </>
      );
    }
    
    export default ProfileTabs;
    