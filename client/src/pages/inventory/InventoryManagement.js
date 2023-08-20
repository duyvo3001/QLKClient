import { React, useEffect, useState } from 'react'
import InventoryTable from './InventoryTable'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from '../../api/Request';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

const InventoryManagement = () => {
  const [DataProduct, setDataProduct] = useState([]) //state.dataProduct
  const Onchangeformtable = async (event, newvalue) => { // when click and when type change event

  }
  function RequestRouterSearch(Url, keyName, SetData) {
    Request
      .get(`/${Url}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {
        const object = []
        if (Url === "SearchStockExport") {
          response?.data?.result?.map((key, index) => {
            return object.push(
              {
                index,
                label: key?.[keyName],
                key: keyName,
                GiaBanLe: key?.GiaBanLe,
                Soluong: key?.Soluong,
                TenLK: key?.TenLK
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
    RequestRouterSearch("SearchStockExport", "MaLK", setDataProduct)
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5} md={4}>
          <Autocomplete
            disablePortal
            id="hi"
            size="small"
            options={DataProduct}
            sx={{ width: 400 }}
            onChange={Onchangeformtable}
            name={"ID"}
            renderInput={
              (params) => <TextField {...params} label="ID Product" onChange={Onchangeformtable} name={"Product"} />
            }
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Button variant="contained" color="success">Add</Button>
        </Grid>
      </Grid>
      <InventoryTable />
    </>
  )
}

export default InventoryManagement