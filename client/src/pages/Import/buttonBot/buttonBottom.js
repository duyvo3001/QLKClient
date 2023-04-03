import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const handleSubmit =(value)=>{

}

function ButtonBottom() {
  return (
    <>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="secondary" handle={handleSubmit(1)}>1</Button>{' '}
          <Button variant="secondary" handle={handleSubmit(2)}>2</Button>{' '}
          <Button variant="secondary" handle={handleSubmit(3)}>3</Button>{' '}
          <Button variant="secondary" handle={handleSubmit(4)}>4</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

export default ButtonBottom;