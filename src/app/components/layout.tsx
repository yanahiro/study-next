// /src/app/components/layout.tsx
import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

function getHeader(title: string): React.ReactElement {
  return (
    <header>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className='container'>
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </section>
    </header>
  );
}

function getFooter(): React.ReactElement {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Yana Test Screen</p>
      </div>
    </footer>
  );
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'Yana Sample Screen Title',
  isHeader = true,
  isFooter = true,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    </Head>
    {isHeader && (getHeader(title))}
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    {isFooter && (getFooter())}
  </div>
)

export default Layout