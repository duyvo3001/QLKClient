import { useEffect, React, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from '../../api/Request';
import { TableDT } from '../Import/table/tableDTStock';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import ButtonBottom from '../Import/buttonBot/buttonBottom';
import { AlterShowEror, AlterShowSuccess } from '../../components/Alter/AlterShow';
const Addproduct = () => {
    const [Show, setShow] = useState({
        valueShow: false,
        message: ""
    });
    const [ShowEror, setShowEror] = useState({
        valueShow: false,
        message: ""
    });
    const [formData, setFormData] = useState({})
   
    const [filters, setfilters] = useState({
        page: 1,
    });
    const [pageindex, setpageindex] = useState({
        page: 1,
    });
    const HandleButtonClick = (newPage) => {
        setfilters({
            ...filters,
            page: newPage,
        });
        setpageindex({ ...pageindex, page: newPage });
    };
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [searchBox, setsearchBox] = useState([]) //state dataProduct
    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                const object = []
                if (Url === "SearchStock") {
                    response?.data?.result?.map((key, index) => {
                        return object.push(
                            {
                                index,
                                label: key?.[keyName],
                                key: keyName,
                                _id: key._id,
                                MaLK: key.MaLK,
                                Color: key.Color,
                                Donvi: key.Donvi,
                                MaNCC: key.MaNCC,
                                MaThuongHieu: key.MaThuongHieu,
                                TinhTrangHang: key.TinhTrangHang,
                                GiaBanLe: key?.GiaBanLe,
                                Soluong: key?.Soluong,
                                TenLK: key?.TenLK,
                                NgayNhap: key?.NgayNhap
                            }
                        )
                    })
                }
                else {
                    response?.data?.result?.map((key) => {
                        return object.push({ label: key?.[keyName], key: keyName })
                    })
                }
                SetData(object)
            })
            .catch((error) => {
                setShowEror({
                    valueShow: true,
                    message: error
                })
            })
    }
    const HandleButtonSubmit = () => {

        Request
            .patch(
                '/AddProduct',
                { formData },
                { headers: { Authorization: sessionStorage.getItem("access_token") } }
            )
            .then(response => {
                if (response?.status === 200) {
                    setsearchBox([])
                    setShow({
                        valueShow: true,
                        message: response.data.message
                    })
                }
                else {
                    setShowEror({
                        valueShow: true,
                        message: response.data.message
                    })
                }
            })
            .catch((error) => {
                setShowEror({
                    valueShow: true,
                    message: error
                })
            });
    }
    useEffect(() => {
        RequestRouterSearch("SearchStock", "MaLK", setDataProduct)
    }, [])

    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) {// click event
            setFormData({ ...formData, "MaLK": newvalue?.MaLK })
            setsearchBox([newvalue])
        }
        else {
            const { name, value } = event.target
            setFormData({ ...formData, [name]: value })
        }
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "") {
            setsearchBox([])
        }
    }
    return (
        <>
            <h4 className='mb-3'> Add Product</h4>
            <Row className='mb-2 row'>
                <Col md={2}>
                    <div className='mb-3'>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={DataProduct}
                            sx={{ width: 200 }}
                            onChange={Onchangeformtable}
                            onInputChange={OnCloseAuto}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Search product"
                                    name={"Product"}
                                />
                            }
                        />
                    </div></Col>
                <Col md={2}>
                    <TextField
                        size="small"
                        id="outlined-number"
                        name='Soluong'
                        label="Quantity"
                        type="number"
                        onChange={Onchangeformtable}
                    />
                </Col>
                <Col>
                    <Button onClick={HandleButtonSubmit}>Add Product</Button>
                </Col>
                <Col>
                    <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
                    <AlterShowSuccess Show={Show} setShow={setShow} />
                </Col>
            </Row>

            <div>
                <TableDT searchBox={searchBox} className="mb-3" filters={filters} valuehidden={true} setfilters={setfilters} />
            </div>
            <div>
                <ButtonBottom
                    pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick}
                />
            </div>
        </>
    )
}

export default Addproduct