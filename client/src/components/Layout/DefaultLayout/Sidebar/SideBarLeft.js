import { React, useState } from "react";
import { Drawer, List, Toolbar, Stack, Avatar, ListItemButton, ListItemIcon } from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AbcIcon from '@mui/icons-material/Abc';
import BarChartIcon from '@mui/icons-material/BarChart';
import OutputIcon from '@mui/icons-material/Output';
import InventoryIcon from '@mui/icons-material/Inventory';
import IosShareIcon from '@mui/icons-material/IosShare';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Logout from "../../../user/Logout";
import FestivalIcon from '@mui/icons-material/Festival';
// import "../client/build/whicon.png"
// import MenuIcon from "@mui/icons-material/Menu"
import "./SideBar.scss";

const SideBarLeft = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false)
  const [open, setOpen] = useState({
    Product: false,
    Inventory: false,
    Brand: false,
    Supplier: false,
    Customer: false,
    Warehouse: false,
    Exportorder: false,
    User: false,
    Report: false,
    Setting: false
  });
  const handleClick = (typeList) => {
    setOpen(prestate => ({
      ...prestate,
      [typeList]: !open?.[typeList]
    }));
  };
  return (
    <>
      <AppBar color="primary" position="fixeds">
        <Toolbar variant="dense">
          <Button variant="outlined" size='small' color="inherit" sx={{ mr: 2 }} onClick={() => { setisDrawerOpen(true) }}>
            <MenuIcon />
          </Button>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
            {"Ware house system"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => { setisDrawerOpen(false) }}>
        <List disablePadding sx={{ width: '100%', maxWidth: 360 }}>
          <Toolbar></Toolbar>
          <Stack sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar>
              <FestivalIcon />
            </Avatar>
          </Stack>
          {/* ----- Dashboard ------------------------------------------*/}
          <ListItemButton href="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          {/* ----- Product ------------------------------------------*/}
          <ListItemButton hidden={false}onClick={() => handleClick("Product")}>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
            {open.Product ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Product} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/ImportStock" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Import" />
              </ListItemButton>
              <ListItemButton href="/ProductView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
              <ListItemButton href="/Category" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Inventory  ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Inventory")}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
            {open.Inventory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Inventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/InventoryManagement" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Mangement" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Brand ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Brand")}>
            <ListItemIcon>
              <AbcIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Brand" />
            {open.Brand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Brand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/importBrand" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/BrandView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Supplier ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Supplier")}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Supplier" />
            {open.Supplier ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Supplier} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/importSupplier" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/SupplierView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Customer ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Customer")}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Customer" />
            {open.Customer ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Customer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/customerPage" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/CustomerView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Ware House ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Warehouse")}>
            <ListItemIcon>
              <WarehouseIcon />
            </ListItemIcon>
            <ListItemText primary="Ware House" />
            {open.Warehouse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Warehouse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/ImportWareHouse" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/WareHouseView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Export  ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Exportorder")}>
            <ListItemIcon>
              <IosShareIcon />
            </ListItemIcon>
            <ListItemText primary="Export Product" />
            {open.Exportorder ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Exportorder} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/ExportOrderPage" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/PaidView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- User  ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("User")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
            {open.User ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.User} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/userPage" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItemButton>
              <ListItemButton href="/UserView" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Report  ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Report")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
            {open.Report ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Report} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/ReportInventory" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItemButton>
              <ListItemButton href="/ReportExport" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <IosShareIcon />
                </ListItemIcon>
                <ListItemText primary="Export" />
              </ListItemButton>
              <ListItemButton href="/ReportOutOfStock" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <OutputIcon />
                </ListItemIcon>
                <ListItemText primary="Out of stock" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- Setting  ------------------------------------------*/}
          <ListItemButton onClick={() => handleClick("Setting")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
            {open.Setting ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.Setting} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/UserProfile" sx={{ pl: 6 }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="User Profile" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* ----- logout ------------------------------------------*/}
          <ListItemButton href="/login" onClick={Logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer >
    </>
  )
};

export default SideBarLeft;
