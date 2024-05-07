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

const MessageContainer = styled.div`
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 10px;
    color: white;
    border-radius: 5px;
    background-color: ${props => props.error ? 'red' : 'green'};
`;

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setMessage(data.msg);
            return;
        }
        try {
            const response = await fetch('https://todo-list-mern-stack-u8qo.onrender.com/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            });
            const data = await response.json();
            if (response.status === 201) {
                history.push('/login');
                setMessage(data.msg);
            } else {
                setError(data.msg);
            }

        } catch (error) {
            console.error('Erro ao fazer Login:', error);
            setMessage(data.msg);;
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
                {message && <MessageContainer>{message}</MessageContainer>}
                {error && <MessageContainer error>{error}</MessageContainer>}
            </LoginForm>
        </LoginDiv>
    )
};
