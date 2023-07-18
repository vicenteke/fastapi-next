import Modal from "@/components/Modal"
import ModalButton from "@/components/ModalButton"

export default function Page() {
  return (<>
    <h2>About</h2>
    <ModalButton target="MyModalAbout" color="primary">Open Modal!</ModalButton>
      <Modal id="MyModalAbout">
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
    </>
  )
}
