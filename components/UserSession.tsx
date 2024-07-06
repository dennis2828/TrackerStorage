import { auth } from "../auth"
import Image from "next/image";

const UserSession = async () => {
    const session = await auth()
    console.log("Ses", session);
    
    if(!session || !session.user) return null;

    const {user} = session;

    return (
    <div className="cursor-pointer">
        <Image src={user.image} width={40} height={40} className="rounded-full" quality={100} priority alt="profile image"/>
    </div> 
  )
}

export default UserSession