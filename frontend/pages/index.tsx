import Head from 'next/head';

import Modal from '@/components/Modal';
import ModalButton from '@/components/ModalButton';
import Navbar from '@/components/Navbar';


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="content">
        <div className="container">  
          <section className="section">
              <h1 className="title">
                  Hello World
              </h1>
              <p className="subtitle">
                  My first website with <strong>Bulma</strong>!
              </p>
              <p>{`Lorem ipsum dolor sit amet, consectetur
  adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.`.repeat(20)}</p>
          </section>
          <ModalButton target="MyModal" color="primary">Open Modal!</ModalButton>
          <Modal id="MyModal">
            <div className="card">
              <div className="card-content">
                <p className="title">
                  “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
                </p>
                <p className="subtitle">
                  Jeff Atwood
                </p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>
                    View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                    Share on <a href="#">Facebook</a>
                  </span>
                </p>
              </footer>
            </div>
          </Modal>
        </div>
      </main>
    </>
  )
}
