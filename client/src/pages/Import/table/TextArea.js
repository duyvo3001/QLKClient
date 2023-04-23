import Form from 'react-bootstrap/Form'; 


export const TextArea = (props) => {

    const {className,hidden,onChange,name,value} = props

  return (
    <Form>
    <Form.Group className="mb-3" >
      <Form.Control as="textarea" rows={3} className={className} hidden={hidden} onChange={onChange} 
      name={name} type="text" placeholder={value}
      />
    </Form.Group>
  </Form>
  )
}
