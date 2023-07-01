import { useState, useEffect } from "react";
import { UserCred } from "../types/user";
import { useAppDispatch } from "../hooks";
import { loadUsers, login, setLoggedinUser, signup } from "../store/actions/user.action";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import { userService } from "../services/user.service";

const LoginSignup: React.FC = ({ }) => {
    const [cred, setCred] = useState<UserCred>({ username: '', password: '', fullname: '' })
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [isLoginErr, setIsLoginErr] = useState<boolean>(false)
    const [isSignupErr, setIsSignupErr] = useState<{ [key: string]: boolean }>({ usernameErr: false, fullnameErr: false })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(loadUsers())
        pathname === '/login' ? setIsLogin(true) : setIsLogin(false)
        return () => {
        }
    }, [pathname])
    const onHandleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const user = await dispatch(isLogin ? login(cred) : signup(cred))
        if (user) {
            return navigate('/')
        }
        console.log(user);

        isLogin ? setIsLoginErr(true) : setIsSignupErr(cred.fullname !== '' ? { ...isSignupErr, usernameErr: true } : { ...isSignupErr, fullnameErr: true })
    }
    return (
        <div className="scroll-placeholder col-2">
            <section className="auth-index">
                <header className="auth-index-header row-1">
                    <NavLink to={'/'}>
                        <SvgIcon iconName="arrowLeft" className={'login-signup-arrow-left-icon'} />
                    </NavLink>
                </header>
                <main className="auth-index-body row-2">
                    <header>
                        <div className="logo-img-wrapper">
                            <img src="https://res.cloudinary.com/dmmsf57ko/image/upload/v1686953338/O-pea_logo-removebg-preview_dsqizt.png" alt="" />
                        </div>
                    </header>
                    <div className="form-wrapper">
                        <form onSubmit={onHandleSubmit}>
                            {!isLogin &&
                                <input type="text" className={isSignupErr.fullnameErr ? 'input-err' : ''} placeholder="Fullname" value={cred.fullname} onChange={(ev) => setCred((prevState) => ({ ...prevState, fullname: ev.target.value }))} />
                            }
                            {isSignupErr.fullnameErr &&
                                <div className="err-msg">
                                    <SvgIcon iconName="exclamMark" className="exclam-mark-icon" />
                                    <p>Please enter full name</p>
                                </div>}


                            <input type="text" className={isLoginErr || isSignupErr.usernameErr ? 'input-err' : ''} placeholder="Username" value={cred.username} onChange={(ev) => setCred((prevState) => ({ ...prevState, username: ev.target.value }))} />
                            <input type="password" className={isLoginErr ? 'input-err' : ''} placeholder="Password" value={cred.password} onChange={(ev) => setCred((prevState) => ({ ...prevState, password: ev.target.value }))} />
                            {isLoginErr || isSignupErr.usernameErr &&
                                <div className="err-msg">
                                    <SvgIcon iconName="exclamMark" className="exclam-mark-icon" />
                                    {isLoginErr ? <p>Wrong username or password</p> : <p>This username is already taken</p>}
                                </div>
                            }
                            <button type="submit">
                                {isLogin ? 'Login' : 'Signup'}
                            </button>
                        </form>

                        {isLogin ?
                            <NavLink className={'login-signup-nav'} to={'/signup'}>
                                Dont have an account?
                            </NavLink>
                            :
                            <NavLink className={'login-signup-nav'} to={'/login'}>
                                Already have an account?
                            </NavLink>
                        }
                    </div>
                </main>
            </section>
        </div>
    );
}
export default LoginSignup

