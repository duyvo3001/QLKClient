import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types'

ButtonBottom.propTypes = {
  ButtonBottom: PropTypes.object.isRequired,
  onPageChange: PropTypes.func
}
ButtonBottom.defaultProps = {
  onPageChange: null,
}


function ButtonBottom(props) {
  const { pagination, onPageChange } = props
  const { page , limit , totalRows } = pagination
  const totalPages = Math.ceil(totalRows/limit)
  function handlePageChange(newPage) {
    if (onPageChange) onPageChange(newPage)
  }

  return (
    <>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="secondary" disabled={page <= 1}
            onClick={handlePageChange(page - 1)}
            handle={props.HandleButtonClick}>Prev</Button>{' '}
          <Button variant="secondary" >2</Button>{' '}
          <Button variant="secondary" >3</Button>{' '}
          <Button variant="secondary" disabled={totalPages <= 1}
            onClick={handlePageChange(page + 1)}
            handle={props.HandleButtonClick}>Next</Button>{' '}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

export default ButtonBottom;