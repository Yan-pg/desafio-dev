import { IFile } from "../Upload";

import './styles.css'

interface IInfosProps {
    files: IFile[];
}

export function Infos({ files }: IInfosProps) {

    const formatCpf = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    const fomatHour = (hour: string) => `${hour.slice(0, 2)} : ${hour.slice(2, 4)}: ${hour.slice(4, 6)} `
    const formateDate = (date: string) => `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(0, 4)}`

    return (
        <>
            {files.map((file, index) => (
                <div key={`${index}-${file.cpf}`} className="container-infos">
                    <div className="amount">
                        <label><strong>Valor</strong></label>
                        <p>R${String(file.amount).padStart(2, '0')},00</p>
                    </div>

                    <div className="owenerName">
                        <label><strong>Name</strong></label>
                        <p>{file.owenerName}</p>
                    </div>

                    <div className="storeName">
                        <label><strong>Nome da loja</strong></label>
                        <p>{file.storeName}</p>
                    </div>

                    <div className="cpf">
                        <label><strong>CPF</strong></label>
                        <p>{formatCpf(file.cpf)}</p>
                    </div>

                    <div className="cardNumber">
                        <label><strong>Numero do cartão</strong></label>
                        <p>{file.cardNumber}</p>
                    </div>


                    <div className="date">
                        <label><strong>Data e hora</strong></label>
                        <p>{formateDate(file.date)}</p>
                        <p>{fomatHour(file.time)}</p>
                    </div>
                </div>
            ))

            }

        </>
    )
}