import React from "react";
import { useState } from "react";

import { signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { setPersistence } from "firebase/auth";
import { browserSessionPersistence } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

import styles from "./Auth.module.css"



function Auth() {
    const [message, setMessage] = useState("")

    const auth = getAuth();



    async function onSocialClick(event) {
        const name = event.target.name;
        let provider;

        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
            }

            else if (name === "facebook") {
                provider = new FacebookAuthProvider();
            }

            else if (name === "twitter") {
                provider = new TwitterAuthProvider();
            }

            await setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    return signInWithPopup(auth, provider);
                })
        }

        catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                setMessage("로그인이 취소되었습니다.");
            }

            else if (error.code === "auth/account-exists-with-different-credential") {
                setMessage("이미 다른 계정으로 가입된 이메일입니다.");
            }

            else {
                setMessage("로그인 중에 오류가 발생했습니다.");
            }
        }
    }



    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <img alt="icon" className={styles.mainIcon} src={process.env.PUBLIC_URL + "/logo/classpot_blue.png"} />

            <div className={styles.title}>
                로그인
            </div>
            <br />

            <button name="google" onClick={onSocialClick} className={styles.googleButton}>
                <img alt="icon" className={styles.socialLoginIcon} src={process.env.PUBLIC_URL + "/auth/google.png"} />
                Google 계정으로 로그인
            </button>

            <button name="facebook" onClick={onSocialClick} className={styles.facebookButton}>
            <img alt="icon" className={styles.socialLoginIcon} src={process.env.PUBLIC_URL + "/auth/facebook.png"} />
                Facebook 계정으로 로그인
            </button>

            <button name="twitter" onClick={onSocialClick} className={styles.twitterButton}>
            <img alt="icon" className={styles.socialLoginIcon} src={process.env.PUBLIC_URL + "/auth/twitter.png"} />
                Twitter 계정으로 로그인
            </button>

            <div className={styles.errorMessage}>
                {message}
            </div>
        </div>
    )
}

export default Auth;