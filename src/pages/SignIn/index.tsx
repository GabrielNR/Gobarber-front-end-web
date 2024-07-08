//imports
import { useCallback, useRef } from 'react';
import getValidationErros from "../../utils/getValidationErrors";

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useAuth } from '../../hooks/AuthContext';

// import { useAuth } from '../../hooks/auth'
// import { useToast } from '../../hooks/toast';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import logoImg from '../../assets/logo.svg';
import { AnimationContainer, Background, Container, Content } from './styles';

//interface
interface SignInFormData {
  email: string;
  password: string
}

//app
export function SignIn() {

  //refs
  const formRef = useRef<FormHandles>(null);
 
  //context
  const { user, signIn } = useAuth()
  // const { signIn } = useAuth();
  // const { addToast } = useToast();

  // const history = useHistory();
  console.log(user)
  
  //callbacks
  const handleSubmit = useCallback(
    async(data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
        })

        await schema.validate(data, {
          abortEarly: false
        });

        //chamar o metodo sign
        await signIn({
          email: data.email,
          password: data.password
        });

        // history.push('/dashboard')

      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
        
          formRef.current?.setErrors(errors);
        
          return
        }

        //disparar toast
        // addToast({
        //   type: 'error',
        //   title: 'Erro na Autenticação',
        //   description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
        // });
      }
    }, [signIn]
  );



  //app
  return(
    <Container >
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
    
          <Form ref={formRef} onSubmit={handleSubmit} >
            <h1>Faça Seu Logon</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input 
              name="password" 
              icon={FiLock} 
              type="password" 
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot-password">Esqueci minha senha</a>
          </Form>

          <a href="/signup">
            <FiLogIn />
            Criar Conta
          </a>
        </AnimationContainer>
      </Content>

      <Background />

    </Container>
  )
}