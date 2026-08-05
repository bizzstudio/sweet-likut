import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import loginImg from "/logo/logo-likut.svg"
import leaf from "/leaf.svg"
import { getWord } from "../Language";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // השדה נשלח גם כ-username וגם כ-phone: מלקטים חדשים מוגדרים
            // באדמין עם שם משתמש, וותיקים עדיין מתחברים במספר הטלפון.
            // השרת מחפש התאמה לכל אחד מהשניים.
            const res = await axios.post(`${import.meta.env.VITE_MAIN_SERVER_URL}/app/login`, {
                username,
                phone: username,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("melaketId", res.data.melaketId);
            navigate("/items");
        } catch (err) {
            setError(err?.response?.data || "Login failed, please try again.");
        }
    };

    const usernameWord = getWord('username');
    const passwordWord = getWord('password');
    const loginWord = getWord('login');

    return (
        <div className="loginPage">
            <div className="card">
                {/* <span className="title">ברוכים הבאים למערכת הליקוט של</span> */}
                <img src={leaf} alt="leaf" className="leaf" />
                <img src={loginImg} alt="login image" className="loginImg" />
                <form className="form" onSubmit={handleLogin}>
                    <div className="group">
                        <input
                            placeholder=""
                            type="text"
                            id="username"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">{usernameWord}</label>
                    </div>
                    <div className="group">
                        <input
                            placeholder=""
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">{passwordWord}</label>
                    </div>
                    <button type="submit">{loginWord}</button>
                </form>
                {error && <p className="loginError">{error}</p>}
            </div>
        </div>
    );
}

export default Login;