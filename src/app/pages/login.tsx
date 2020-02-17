// /src/app/pages/login.tsx
import * as React from 'react'
import Router from 'next/router'
import Layout from '../components/layout'
import SimpleReactValidator from 'simple-react-validator';

interface LoginProps {
}
interface LoginState {
  credentials: {
    email: string
    password: string
  }
  errors: {
    email: boolean
    password: boolean
  }
  isLoading: boolean
}

class Login extends React.Component<LoginProps, LoginState> {

  // prorperty
  validator: any

  constructor(props: LoginProps) {
    super(props)
    this.state = {
      credentials: {
        email: "",
        password: "",
      },
      errors: {
        email: false,
        password: false,
      },
      isLoading: false,
    }
    this.validator = new SimpleReactValidator();
  }

  handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials } = this.state
    credentials[e.target.name] = e.target.value
    this.setState({ credentials })
  }

  handleCredentialsBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials, errors } = this.state
    credentials[e.target.name] = e.target.value
    if (!this.validator.fieldValid(e.target.name)) {
      // errors update
      errors[e.target.name] = true
      // validation error
      this.validator.showMessageFor(e.target.name)
      this.forceUpdate();
    } else {
      errors[e.target.name] = false
    }
    // update errors status
    this.setState({ errors })
  }

  handleCredentialFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { errors } = this.state
    errors[e.target.name] = false
    this.setState({ errors })
  }

  handleLoginSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      alert('Input validation success.')
    } else {
      // alert('Input validation error.')
      // show message
      this.validator.showMessages()
      this.forceUpdate()
      const validErrors = this.validator.getErrorMessages()
      let { errors } = this.state
      Object.keys(validErrors).forEach(validError => {
        // console.log(validError)
        errors[validError] = true
      })
      // update errors status
      this.setState({ errors })

      return false;
    }
    this.setState({ isLoading: true })

    setTimeout(() => {
      this.setState({ isLoading: false })
      Router.push('/user')
      // Router.replace('/user')
    }, 1000)
  }

  public render() {
    return (
      <Layout title="Login" isHeader={false} isFooter={false}>
        <form action="">
          <div className="login-area">
            <div>
              <h1 className=""><img src="/static/yanatch_black.png" alt="my image" /></h1>
            </div>
            <article className="box is-rounded">
              <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left">
                  <input className={`input ${this.state.errors.email ? 'is-danger' : ''}`} type="email" name="email" value={this.state.credentials.email} onChange={this.handleCredentialsChange} onBlur={this.handleCredentialsBlur} onFocus={this.handleCredentialFocus} placeholder="Email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
                <div className="help is-danger">{this.validator.message('email', this.state.credentials.email, 'required|email')}</div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input className={`input ${this.state.errors.password ? 'is-danger' : ''}`}  type="password" name="password" value={this.state.credentials.password} onChange={this.handleCredentialsChange} onBlur={this.handleCredentialsBlur} onFocus={this.handleCredentialFocus} placeholder="Password" autoComplete="off" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
                <div className="help is-danger">{this.validator.message('password', this.state.credentials.password, 'required')}</div>
              </div>
              <div className="field">
                <p className="">
                  <button className="button is-medium is-info is-fullwidth" onClick={this.handleLoginSubmit}>ログイン</button>
                </p>
              </div>
            </article>
          </div>
        </form>
        <style jsx>
        {`
          .login-area {
            margin: 0 auto;
            min-width: 375px;
            max-width: 400px
          }
          .box {
            padding-top: 3rem;
          }
          h1 {
            padding: 3rem 6rem;
            text-align: center;
          }

          .field {
            padding-bottom: 1.5rem;
          }

          .icon svg {
            height: 16px;
          }
        `}
        </style>
      </Layout>
    );
  }

}

export default Login;