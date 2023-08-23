import { useEffect, React, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Request from "../../../src/api/Request";

const DashBoard = () => {

    const [count, setCount] = useState({
        Inventory: 0,
        InventoryQuantity: 0,
        Export: 0,
        ExportQuantity: 0
    })

    useEffect(() => {
        Request.get("/Dashboard",
            { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                setCount(response?.data?.result)
            })
            .catch((error) => { console.error(error) })
    }, [])

    return (
        <Container fixed >
            <Grid >
                <h2>Dash Board</h2>
            </Grid>
            <Typography color="black" className="mb-3">
                Inventory Summary
            </Typography>
            <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={6} md={6} >
                    <Card sx={{ minWidth: 275 }}  >
                        <CardContent  >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign={'center'} >
                                Inventory
                            </Typography>
                            <Typography variant="h4" component="div" textAlign={'center'}>{count.Inventory}
                            </Typography>
                            <Typography textAlign={'center'} sx={{ mb: 1.5 }} color="text.secondary">
                                items
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign={'center'}>
                                Total quantity
                            </Typography>
                            <Typography variant="h4" component="div" textAlign={'center'}>{count.InventoryQuantity}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign={'center'}>
                                product
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography color="black" className="mb-3">
                Export Summary
            </Typography>
            <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={6} md={6} >
                    <Card sx={{ minWidth: 275 }}  >
                        <CardContent  >
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign={'center'} >
                                Export order
                            </Typography>
                            <Typography variant="h4" component="div" textAlign={'center'}>{count.Export}
                            </Typography>
                            <Typography textAlign={'center'} sx={{ mb: 1.5 }} color="text.secondary">
                                order
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign={'center'}>
                                Total product
                            </Typography>
                            <Typography variant="h4" component="div" textAlign={'center'}>{count.ExportQuantity}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign={'center'}>
                                product
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography color="black" className="mb-3">
                Recent Items
            </Typography>
        </Container>
    )
}

export default DashBoard