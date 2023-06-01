import { useState, useEffect } from "react";
import { UserCred } from "../types/user";
import MainHeader from "./MainHeader";
import { useAppDispatch } from "../hooks";
import { loadUsers, login, signup } from "../store/actions/user.action";
import { useLocation, useParams } from "react-router-dom";

const LoginSignup: React.FC = ({ }) => {
    const [cred, setCred] = useState<UserCred>({ username: '', password: '' })
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(loadUsers())
        pathname === '/login' ? setIsLogin(true) : setIsLogin(false)
        return () => {
        }
    }, [pathname])

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(cred))
    }
    const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signup(cred))
    }
    return (
        <>
            <MainHeader isPantry={false} />
            {isLogin ? <p>Login</p> : <p>Signup</p>}
            <form onSubmit={isLogin ? onLogin : onSignUp}>
                {isLogin ? 
                ''
                 : 
                 <>
                 <label>Fullname</label>
                <input type="text" value={cred.fullname} onChange={(ev) => setCred((prevState) => ({ ...prevState, fullname: ev.target.value }))} />
                 </>
                }
                 <label>Username</label>
                <input type="text" value={cred.username} onChange={(ev) => setCred((prevState) => ({ ...prevState, username: ev.target.value }))} />
                <label>Password</label>
                <input type="password" value={cred.password} onChange={(ev) => setCred((prevState) => ({ ...prevState, password: ev.target.value }))} />
                <button> {isLogin ? 'Login' : 'Signup'}</button>
            </form>
        </>
    );
}
export default LoginSignup

