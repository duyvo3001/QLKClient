import { React, useState, useEffect } from "react";
import { TableDT } from "../../Import/table/tableDTStock"
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";
import "../../../style/styleTable.scss"
const ProductView = () => {
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [searchBox, setsearchBox] = useState([]) //state dataProduct
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

    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                const object = []
                if (Url === "SearchStock") {
                    response?.data?.result?.map((key, index) => {
                        console.log(key)
                        return object.push(
                            {
                                index,
                                label: key?.[keyName],
                                key: keyName,
                                _id: key._id,
                                Category: key.Category,
                                MaLK: key.MaLK,
                                MaKho: key.MaKho,
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
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        RequestRouterSearch("SearchStock", "MaLK", setDataProduct)
    }, [])

    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) {// click event
            // console.log(newvalue)
            setsearchBox([newvalue])
        }
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "") {
            setsearchBox([])
        }
    }

    const defprops ={
        options : DataProduct , 
        getOptionLabel: (options) => options.label + ' - ' + options.Category + ' - ' + options.MaKho + ' - ' + options.MaNCC
    }

    return (
        <>
            <Container fixed>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={3} sm={3} md={3} className="mb-3">
                        <h4>Manage: Product</h4>
                    </Grid>
                    <Grid className="content-wrapper" item xs={3} sm={3} md={3}>
                        <div className="mb-3">
                            <Autocomplete
                                disablePortal
                                id="test"
                                fullWidth={true}
                                size="small"
                                {...defprops}
                                sx={{ width: 800 }}
                                onChange={Onchangeformtable}
                                onInputChange={OnCloseAuto}
                                name={"ID"}
                                renderInput={
                                    (params) => <TextField {...params}
                                        label="Search"
                                        // onChange={Onchangeformtable}
                                        name={"Product"}
                                    />
                                }
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div className="content-table">
                <TableDT searchBox={searchBox} className="mb-3" filters={filters} valuehidden={false} setfilters={setfilters} />
                {/* truyen du lieu data product vao day  */}
                <ButtonBottom
                    pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick}
                />
            </div>
        </>
    )
}

export default ProductView