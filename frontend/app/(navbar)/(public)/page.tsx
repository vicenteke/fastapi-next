import Button from "@mui/material/Button";

export default function Home() {
  return (
    <>
      <h1 className="title">
          Hello World
      </h1>
      <p className="subtitle">
          My first website with <strong>MUI</strong>!
      </p>
      <Button color='primary' variant='contained'>
        My button
      </Button>
    </>
  )
}
