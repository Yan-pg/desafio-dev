import React, { useContext, useEffect, useState } from 'react'

import './style.css'
import Folder from '../../assets/folder.png'
import { Modal } from '../../components/Modal';
import { Infos } from '../Infos';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../App';
import Button from '../../components/Button';

export interface IFile {
    type: string;
    date: string
    amount: number;
    cpf: string;
    cardNumber: string;
    time: string
    owenerName: string;
    storeName: string;
}

export function Upload() {
    const { nameUser , SignOut} = useContext(AuthContext);

    const [files, setFiles] = useState<IFile[]>([]);
    const [showLoading, setShowLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();


    useEffect(() => {
        if (!nameUser) {
            history.push('/');
        }
    }, [nameUser]);

    const handleInputFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        setShowLoading(true)
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            const text = (e.target.result.split('\n'))
            let line = 0
            const infos: IFile[] = []

            while (line < text.length - 1) {
                infos.push(normalizeLine(text[line]))
                line++
            }

            setTimeout(() => {
                setShowLoading(false);
                setFiles(infos)
                setShowModal(true)
            }, 2000)
        };

        reader.readAsText(e.target.files[0])
    }
    

    const handleSingOut = () => {
        SignOut();
    
        setTimeout(() => {
          history.push('/');
        }, 200);
      };
    

    const normalizeLine = (line: string) => {
        const type = line.slice(0, 1);
        const date = line.slice(1, 9);
        const amount = Number(line.slice(9, 19)) / 100;
        const cpf = line.slice(19, 30);
        const cardNumber = line.slice(30, 42);
        const time = line.slice(42, 48);
        const owenerName = line.slice(48, 62);
        const storeName = line.slice(62, 81);

        return {
            type,
            date,
            amount,
            cpf,
            cardNumber,
            time,
            owenerName,
            storeName
        }
    }

    return (
        <>
            {files.length > 0 && showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Infos files={files} />
                </Modal>
            )}
            
            <div className="container">
                <div className="content">
                    <main>
                        <div className="content-infos">
                            <img src={Folder} alt="folder" />
                            <p>Arrate seu documento <br /> ou</p>
                            <Button>Buscar</Button>
                            <input onChange={(e) => handleInputFile(e)} type="file" accept=".txt" />
                        </div>
                    </main>
                 </div>
                 {showLoading && <div className="loading">
                <div className="bar"></div>
            </div>}
                <Button onClick={handleSingOut} style={{background: "#E9453A", position: 'absolute', right: 30, top: 30 }}>
                    Sair
                </Button>
            </div>
     
        </>
    )
}

