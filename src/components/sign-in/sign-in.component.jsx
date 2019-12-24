import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        // console.log(event.target.value === this.state.email);
        
        const { value, name } = event.target;
        this.setState({ [name]: value }); // dynamically set state
    }

    render(){
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput label='email' handleChange={this.handleChange} name='email' type='email' value={this.state.email} required />
                    <FormInput label='password' handleChange={this.handleChange} name='password' type='password' value={this.state.password} required />

                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;