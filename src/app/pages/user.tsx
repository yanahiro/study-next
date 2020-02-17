// /src/app/pages/user.tsx
import * as React from 'react'
import Layout from '../components/layout'
import fetch from "isomorphic-unfetch";

interface UserProps {
  data: {
    name: string
    enname: string
    birthday: string
    constellation: string
  }
}

class User extends React.Component<UserProps> {
  constructor(props: UserProps) {
    super(props)
  }
  static async getInitialProps(ctx: any) {
    try {
      let response;
      // response = await fetch("http://localhost/api/user");
      // 現在のcontainerの性質上、クライアントとサーバーから取得するURLが異なる。
      if (process.browser) {
        response = await fetch("http://localhost:8081/user.php");
      } else {
        response = await fetch("http://study-next_web_1:8081/user.php");
      }
      const json = await response.json();
      return {
        data: json.data
      };
    } catch (e) {
      console.error(e);
      return {
        data: []
      };
    }
  }

  public render() {
    return (
      <Layout title="Yana Sample Test Screen">
        <div className="message is-info user-area">
          <h1 className="message-header">Introduction</h1>
          <div className="description">
            <figure className="image is-128x128">
              <img className="is-rounded" src="/static/yanagisawa.jpg" />
            </figure>
          </div>
    
          <p className="description name">{this.props.data.name}</p>
          <p className="description en-name">{this.props.data.enname}</p>
          <p className="description birthday">{this.props.data.birthday}</p>
          <p className="description constellation">{this.props.data.constellation}</p>
        </div>
        <style jsx>
          {`
            .user-area {
              margin: 0 auto;
              min-width: 375px;
              max-width: 600px;
              padding-bottom: 3rem;
              margin-bottom: 3rem;
            }
            .description {
              margin-top: .2rem;
              text-align: center;
            }
            .description figure {
              margin-top: 2rem;
              margin-bottom: 2rem;
              top: 0;
              left: 50%;
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
            }
            .name {
              margin-top: 1rem;
              font-size: 1.4rem;
              font-weight: bold;
              line-height: 1.6rem;
            }
            .en-name {
              letter-spacing: -.05rem;
            }
            .birthday {
              font-size: .9rem;
              margin-top: .75rem;
            }
            .constellation {
              font-size: .9rem;
              margin-top: -.2rem;
            }
          `}
          </style>
      </Layout>
    );
  }
}

export default User
