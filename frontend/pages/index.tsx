import Layout from "../components/layout";
import Counter from "../components/counter";

const Index = () => (
  <Layout home>
    <section className="section">
      <div className="container">
        <h1 className="title">
          Hello World from <a href="https://nextjs.org/">Next.js</a> and{" "}
          <a href="https://bulma.io/">Bulma</a>!
        </h1>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Counter></Counter>
      </div>
    </section>
    <section className="section">
        <div className="container">
            <div className="message is-success">
                <div className="message-header">
                    <p>Hello World</p>
                    <button className="delete" aria-label="delete"></button>
                </div>
                <div className="message-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
                </div>
            </div>
        </div>
    </section>
    <section className="section">
        <div className="container">
            <div className="message is-info">
                <div className="message-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
                </div>
            </div>
        </div>
    </section>
  </Layout>
);

export default Index;
