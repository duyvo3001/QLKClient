import { React, useState, useEffect } from "react";
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import TableUser from "../../Import/table/TableUser"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";

const UserView = () => {
    const [DataUser, setDataUser] = useState([]) //state dataProduct
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
                if (Url === "SearchUser") {
                    response?.data?.result?.map((key, index) => {
                        return object.push(
                            {
                                index,
                                label: key?.[keyName],
                                key: keyName,
                                _id: key._id,
                                MaNV: key.MaNV,
                                TenNV: key.TenNV,
                                GioiTinh: key.GioiTinh,
                                DiaChi: key.DiaChi,
                                NgaySinh: key?.NgaySinh,
                                USER_NV: key?.USER_NV,
                                PASSWORD: key?.PASSWORD,
                                SDT: key?.SDT,
                                Email: key?.Email,
                                NgayTao: key?.NgayTao,
                                AccessRight: key?.AccessRight,
                                pass_nv :key?.pass_nv
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
        RequestRouterSearch("SearchUser", "MaNV", setDataUser)
    }, [])
    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) // click event
            setsearchBox([newvalue])
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "")
            setsearchBox([])
    }
    return (
        <>
            <h4>Manage : User</h4>
            <div className="mb-3">
                <Autocomplete
                    disablePortal
                    id="test"
                    fullWidth={true}
                    size="small"
                    options={DataUser}
                    sx={{ width: 200 }}
                    onChange={Onchangeformtable}
                    onInputChange={OnCloseAuto}
                    name={"ID"}
                    renderInput={
                        (params) => <TextField {...params}
                            label="Search"
                            name={"User"}
                        />
                    }
                />
            </div>
            <TableUser searchBox={searchBox} className="mb-3" filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default UserView