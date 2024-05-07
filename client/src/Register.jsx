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

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            });
            const data = await response.json();
            if (response.status === 201) {
                alert(data.msg);
            } else {
                alert(data.msg);
            }

        } catch (error) {
            console.error('Falha ao registrar:', error);
            alert('Falha ao registrar');
        }
    }

    return (
        <LoginDiv>
            <LoginForm onSubmit={handleRegister}>
                <InputField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
                <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <InputField type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirme a Senha" required />
                <SubmitButton type="submit">Registrar</SubmitButton>
                <Text1>Já tem uma conta?<a href="/"> Fazer Login</a></Text1>
            </LoginForm>
        </LoginDiv>
    )
};
