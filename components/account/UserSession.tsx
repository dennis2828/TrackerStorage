import { auth } from "../../auth"
import AccountActions from "./AccountActions";

const UserSession = async () => {
    const session = await auth()
    
    if(!session || !session.user) return null;

    const {user} = session;

    return (
      <AccountActions user={user} />
    )
}

export default UserSession