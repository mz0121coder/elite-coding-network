import { Icon, Message, Divider }  from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next.link";

export const HeaderMessage = () => {
    const router = useRouter();
    const signupRoute = router.pathname === "/signup";

    return (
        <Message
        color = "teal"
        attached
        header = {signupRoute ? "Get Started" : "Welcome Back"}
        icon = signupRoute ? "settings" : "privacy"}
        content = {signupRoute ? "Create New Account": "Login with Email and Password"}
        />
    );
    );

    


}