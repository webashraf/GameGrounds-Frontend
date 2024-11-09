import { JwtPayload } from "jwt-decode";
import { useToken } from "../../Redux/feature/authSlice";
import { useAppSelector } from "../../Redux/hook";
import { verifyToken } from "../../utils/verifyToken";

// Define IUser extending JwtPayload with your properties
interface IUser extends JwtPayload {
  email: string;
  role: string;
  _id: string;
}

const useUser = () => {
  const token = useAppSelector(useToken);

  let user: IUser | undefined;
  if (token) {
    user = verifyToken(token) as IUser; // Cast to IUser
    console.log("Hook User", user);
  }

  return user;
};

export default useUser;
