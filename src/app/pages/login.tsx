// /src/app/pages/login.tsx
import * as React from 'react'
import Router from 'next/router'
import Layout from '../components/layout'

interface LoginProps {}
interface LoginState {
  credentials: {
    email: string
    password: string
  }
  isLoading: boolean
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      credentials: {
        email: null,
        password: null,
      },
      isLoading: false
    }
  }

  handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { credentials } = this.state
    credentials[e.target.name] = e.target.value

    this.setState({ credentials })
  }

  handleLoginSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
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
                  <input className="input" type="email" placeholder="Email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                  <input className="input" type="password" placeholder="Password" autoComplete="off" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
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
        `}
        </style>
      </Layout>
    );
  }

}

export default Login;