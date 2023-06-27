import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types'
import { GrFormPrevious ,GrFormNext } from "react-icons/gr";
ButtonBottom.proTypes = {
  pageindex: PropTypes.object.isRequired,
  HandleButtonClick: PropTypes.func
};
ButtonBottom.defaultProps = {
  HandleButtonClick: null
}

function ButtonBottom(props) {

  const { pageindex, HandleButtonClick } = props;
  const { page } = pageindex;
  
  const handlePageChange = (newPage) => {
    if (HandleButtonClick) {
      HandleButtonClick(newPage);
    }
  }

  return (
    <>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="secondary"
           disabled={page === 1}
           onClick ={()=>handlePageChange(page -1)}
           ><GrFormPrevious/></Button>{' '}
          <Button variant="secondary"
           onClick ={()=>handlePageChange(page  + 1)}
           ><GrFormNext/></Button>{' '}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

export default ButtonBottom;