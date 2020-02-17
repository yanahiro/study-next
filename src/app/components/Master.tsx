import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
}

const Master: React.FunctionComponent<Props> = ({
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
    </Head>
    <header>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className='container'>
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </section>
    </header>
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Yana Test Screen</p>
      </div>
    </footer>
  </div>
)

export default Master