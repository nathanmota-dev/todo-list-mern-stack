import { useState } from 'react'
import styled from 'styled-components'

const LoginDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    height:  90vh;
`;

const LoginForm = styled.form`
    max-width: 300px;
    margin: 0 auto;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: rgba(113, 0, 212, 0.7);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(95, 0, 179, 0.5);
    }
`;

const Text1 = styled.p`
    padding: 10px;
`;

export default function Login({ setIsAuthenticated }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
            } else {
                alert(data.msg);
            }

        } catch (error) {
            console.error('Erro ao fazer Login:', error);
            alert('Falha ao fazer login');
        }
    }

    return (
        <LoginDiv>
            <LoginForm onSubmit={handleLogin}>
                <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <SubmitButton type="submit">Entrar</SubmitButton><br />
                <Text1>Ainda não tem uma conta?<a href="/register"> Criar conta</a></Text1>
            </LoginForm>
        </LoginDiv>
    )
};
