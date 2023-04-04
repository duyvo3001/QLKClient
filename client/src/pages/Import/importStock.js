import { tableDT as TableDT } from "./table/tableDTStock";
import {React, useState} from 'react'
import Container from 'react-bootstrap/Container';
import RowCol from "./RowCol";
import ButtonSubmit from "./ButtonSubmit" ;
import Request from '../../api/Request.js'
import ButtonBottom from  '../Import/buttonBot/buttonBottom'
// import InputGroup from 'react-bootstrap/InputGroup';
const ImportStock = () => {
    const [pageindex ,SetpageIndex] = useState({
        page : 1 
    })
    const [formData, setFormData] = useState({});

    const HandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const HandleData = () => {
        Request.post('/PostStock', { formData },
            { headers: { 'Authorization': sessionStorage.getItem("access_token") } },
        )
            .catch(error => {
                console.log(error);
            });
    }

    const HandleButtonClick = (newPage) => {
        console.log('new Page ' , newPage);
    }

    return (
        
        <Container>
            <h5>Import : Stock</h5>
            <form  onSubmit={HandleData}>
                <RowCol handle={HandleChange}text1="ID Stock" ID1="MaLK" text2="Name Stock" ID2="TenLK" />
                <RowCol handle={HandleChange}text1="ID Brand" ID1="MaThuongHieu" text2="Color" ID2="Color" />
                <RowCol handle={HandleChange}text1="Unit" ID1="Donvi" text2="Quantity" ID2="Soluong" />
                <RowCol handle={HandleChange}text1="Retail price" ID1="GiaBanLe" text2="ID Warehouse" ID2="MaKho" />
                <RowCol handle={HandleChange}text1="Stock status" ID1="TinhTrangHang" text2="ID Supplier" ID2="MaNCC" />
                <ButtonSubmit/>
            </form>
            <TableDT/>
            <ButtonBottom onPageChange={HandleButtonClick}  pageindex ={pageindex}/>
        </Container>
    )
}

export default ImportStock