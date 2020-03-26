import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Register(){
    const [ name, setName ]  = useState('');
    const [ email, setEmail ]  = useState('');
    const [ whatsapp, setWhastapp ]  = useState('');
    const [ city, setCity ]  = useState('');
    const [ uf, setUf ]  = useState('');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }catch(e){
            alert(`Erro no cadastro`);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                    <h1>Cadastro</h1>    
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color='#E02041'/>
                    Não tenho cadastro
                </Link>
                </section>                
                <form onSubmit={handleRegister}>
                    <input
                     type="text"
                     value={name}
                     placeholder="Nome da ONG"
                     onChange={e => setName(e.target.value)}
                    />
                    <input 
                     type="email" 
                     value={email}
                     placeholder="E-mail"
                     onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    type="text" 
                    value={whatsapp}
                    placeholder="WhatsApp"
                    onChange={e => setWhastapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                        type="text" 
                        value={city}
                        placeholder="Cidade"
                        onChange={e => setCity(e.target.value)}
                        />
                        <input 
                        type="text" 
                        value={uf}
                        placeholder="UF" 
                        style={{ widht:80 }}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}