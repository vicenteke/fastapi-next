import Modal from '@/components/Modal';
import ModalButton from '@/components/ModalButton';
import PermissionChecker from '@/components/PermissionChecker';


export default function Home() {
  return (
    <>
      <PermissionChecker permissions={['IS_ROOT_USER']} redirect to='/about'>
      <section className="section">
          <h1 className="title">
              Hello World
          </h1>
          <p className="subtitle">
              My first website with <strong>Bulma</strong>!
          </p>
          <p dangerouslySetInnerHTML={{__html: `Lorem ipsum dolor sit amet, consectetur
adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.`.repeat(20)}}></p>
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
      </PermissionChecker>
    </>
  )
}
