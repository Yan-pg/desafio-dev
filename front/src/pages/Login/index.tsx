import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../App';

import background from '../../assets/background.png'
import google from '../../assets/google.png'
import Button from "../../components/Button";

import './styles.css'


export function Login() {
    const { nameUser, signWithGoogle } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (nameUser) {
            history.push('/upload');
        }
    }, [nameUser]);

    const handleSign = async () => {
        console.log('entru')

        if (!nameUser) {
            await signWithGoogle();
        }

        history.push('/upload');
    };

    return (
        <div className="container-login">
            <div className="asideDiv">
                <img src={background} alt="backgroud" />
            </div>

            <main>
                <div className="content-login">
                    <Button onClick={() => handleSign()} style={{ background: '#E9453A' }}>
                        <img src={google} alt="logoGoogle" />

                        <span style={{marginLeft: '5px'}}>Entre com o google</span>
                    </Button>
                </div>
            </main>
        </div>
    )
}