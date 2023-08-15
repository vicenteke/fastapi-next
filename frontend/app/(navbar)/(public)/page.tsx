import ModalButton from '@/components/ModalButton';
import Alert from '@/components/Alert';
import { generateId } from '@/lib/random';


export default function Home() {
  const id = generateId();
  return (
    <>
      <h1 className="title">
          Hello World
      </h1>
      <p className="subtitle">
          My first website with <strong>Bulma</strong>!
      </p>

      <ModalButton target={id} color="primary">Open Modal!</ModalButton>
      <Alert id={id} type='success' title='Your account has been created successfully!' confirm cancel>
        Your account has been created successfully! My ceral is loud and it's demanding to know why would I sin against nature so thoughtlessly. Pandas are not very smart creatures; however, they manage to handle bamboos as swords beautyfully.
      </Alert>
    </>
  )
}
