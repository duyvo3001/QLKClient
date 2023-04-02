import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function ButtonBottom() {
  return (
    <>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="secondary">1</Button>{' '}
          <Button variant="secondary">2</Button>{' '}
          <Button variant="secondary">3</Button>{' '}
          <Button variant="secondary">4</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

export default ButtonBottom;