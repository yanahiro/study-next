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
  isLoading: boolean
}

class Login extends React.Component<LoginProps, LoginState> {

  // prorperty
  private validator: any

  private rules = new Map<string, string>([
    ['email', 'required|email'],
    ['password', 'required']
  ])

  constructor(props: LoginProps) {
    super(props)
    this.state = {
      credentials: {
        email: "",
        password: "",
      },
      isLoading: false
    }
    this.validator = new SimpleReactValidator({
      element: message => <div className="help is-danger">{message}</div>
    })
    console.log(this.validator)
  }

  handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials } = this.state
    credentials[e.target.name] = e.target.value

    this.setState({ credentials })
  }

  handleCredentialsBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials } = this.state
    credentials[e.target.name] = e.target.value
    if (!this.validator.fieldValid(e.target.name)) {
      // validation error
      this.validator.showMessageFor(e.target.name)
      this.forceUpdate();
    }
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
      Object.keys(validErrors).forEach(validError => {
        // console.log(validError)
        // errorで何かしたい場合
      })

      return false;
    }
    this.setState({ isLoading: true })

    setTimeout(() => {
      this.setState({ isLoading: false })
      Router.push('/user')
      // Router.replace('/user')
    }, 1000)
  }

  // Inputのエラー判定
  isErrorInput = (name: string, value: string) => {
    // エラーメッセージの有無で判定
    return Boolean(this.getErrorMessage(name, value))
  }

  // エラーメッセージを表示
  getErrorMessage = (name: string, value: string) => {
    return this.validator.message(name, value, this.rules.get(name))
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
                  <input className={`input ${this.isErrorInput('email', this.state.credentials.email) ? 'is-danger' : ''}`} type="email" name="email" value={this.state.credentials.email} onChange={this.handleCredentialsChange} onBlur={this.handleCredentialsBlur} placeholder="Email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
                {this.getErrorMessage('email', this.state.credentials.email)}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input className={`input ${this.isErrorInput('password', this.state.credentials.password) ? 'is-danger' : ''}`}  type="password" name="password" value={this.state.credentials.password} onChange={this.handleCredentialsChange} onBlur={this.handleCredentialsBlur} placeholder="Password" autoComplete="off" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
                {this.getErrorMessage('password', this.state.credentials.password)}
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