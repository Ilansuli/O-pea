import { NavLink } from "react-router-dom";
import { useClickOutside } from "../hooks";

type requireAuthModalProps = {
    closeRequireAuthModal: () => void
};

const RequireAuthModal: React.FC<requireAuthModalProps> = ({ closeRequireAuthModal }) => {
    const modalRef = useClickOutside(() => closeRequireAuthModal());

    return (
        <>
            {/* <section className="modal-wrapper" onClick={() => closeRequireAuthModal(false)}></section> */}
            <section className="modal">
                <section className="require-auth-modal" ref={modalRef}>
                    <header >
                        <h4>Your'e not registered</h4>
                    </header>
                    <main >
                        <p>In order to continue you will need to sign in</p>
                    </main>
                    <footer>
                        <button className="not-now-btn" onClick={() => closeRequireAuthModal()}>Not now</button>
                        <NavLink to={'/login'} onClick={() => closeRequireAuthModal()} className="sign-in-btn">Sign in</NavLink>
                    </footer>
                </section>
            </section>
        </>
    );
}
export default RequireAuthModal

// .modal {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     z-index: 9999;
//   }