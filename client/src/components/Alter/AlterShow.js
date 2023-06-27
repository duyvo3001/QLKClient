import { React } from 'react'
import Alert from 'react-bootstrap/Alert';

export const AlterShowEror = (props) => {
    const {setShowEror ,ShowEror} = props
    if (ShowEror?.valueShow === true) {
        return (
            <Alert variant="danger" onClose={() => setShowEror({
                valueShow: false,
                message: ""
            })} dismissible>
                {
                    ShowEror?.message
                }
            </Alert>
        );
    }
}
export const AlterShowSuccess = (props) => {
    const {setShow ,Show} = props
    if (Show?.valueShow === true) {
        return (
            <Alert variant="success" onClose={() => setShow({
                valueShow: false,
                message: ""
            })} dismissible>
                {
                    Show?.message
                }
            </Alert>
        );
    }
}