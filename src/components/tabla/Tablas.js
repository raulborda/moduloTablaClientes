/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Input, Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined } from "@ant-design/icons";
import TablaInfo from "./TablaInfo";
import TablaProduc from "./TablaProduc";
import TablaRubros from "./TablaRubros";
import NuevoCliente from "../nuevoCliente/NuevoCliente";

const TablasCli = () => {
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;
  console.log("url: ", URL)
  const {
    searchValue,
    setSearchValue,
    selectedCliente,
    isDrawerVisible,
    setIsDrawerVisible,
    cliSelect,
    activeTab,
    setActiveTab,
    isDrawerVisibleForm,
    setIsDrawerVisibleForm,
  } = useContext(GlobalContext);

  const showDrawer = () => {
    setIsDrawerVisibleForm(true);
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '18px',
    right: '20px',
  };
  
  const CustomCloseIcon = ({ onClick }) => (
    <div style={closeIconStyle} onClick={onClick}>
      {/* Coloca aquí tu icono de cierre personalizado */}
      X
    </div>
  );

  const closeDrawer = () => {
    setIsDrawerVisibleForm(false);
  };


  localStorage.setItem("cliSelect", cliSelect);

  const handleCambio = (tabKey) => {
    setActiveTab(tabKey);
    cargarTabla(tabKey);
  };

  const cargarTabla = (tabKey) => {
    let tablaComponente;

    switch (tabKey) {
      case "1":
        tablaComponente = <TablaInfo />;
        break;
      case "2":
        tablaComponente = <TablaProduc />;
        break;
      case "3":
        tablaComponente = <TablaRubros />;
        break;
      default:
        tablaComponente = null;
        break;
    }

    return tablaComponente;
  };

  useEffect(() => {
    cargarTabla(activeTab);
  }, []);

  return (
    <>
      <div className="div_wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h1 className="titulos">CLIENTES</h1>
          <div>
            <Input
              style={{ width: "200px" }}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar por cliente o cuenta"
            />
            <Button
              type="primary"
              style={{ width: "100px", padding: "0px", marginLeft: "10px" }}
              onClick={showDrawer}
            >
              Nuevo Lead
            </Button>
          </div>
        </div>

        <Drawer
          title="Nuevo Cliente"
          visible={isDrawerVisibleForm}
          onClose={closeDrawer}
          width={600}
          closeIcon={<CustomCloseIcon />}
        >
          <NuevoCliente />
        </Drawer>

        <Tabs activeKey={activeTab} onChange={handleCambio}>
          <>
            <Tabs.Tab key="1" tab="INFORMACIÓN">
              {cargarTabla(activeTab)}
            </Tabs.Tab>
            <Tabs.Tab key="2" tab="PRODUCTIVO">
              {cargarTabla(activeTab)}
            </Tabs.Tab>
            <Tabs.Tab key="3" tab="RUBROS">
              {cargarTabla(activeTab)}
            </Tabs.Tab>
          </>
        </Tabs>
      </div>
      {selectedCliente && selectedCliente.cuenta!=="" &&(        
        <Drawer
          visible={isDrawerVisible}
          onClose={() => setIsDrawerVisible(false)}
          title={selectedCliente.clientes}
          placement="bottom"
          height={"100vh"}
          style={{ whiteSpace: "nowrap", marginTop: "-10px" }}
          closeIcon={
            <CloseOutlined
              style={{ position: "absolute", top: "10px", right: "10px" }}
            />
          }
        >
          <iframe
            loading="lazy"
            // src={`${URL}/duoc/modulos/vista_cliente/?idC=${cliSelect}`} // para el resto de los crm
            src={`${URL}/tati/modulos/vista_cliente/?idC=${cliSelect}`} // para probar en tati
            width={"100%"}
            // height={"600"}
            height={"1000"}
            style={{ border: "none" }}
            title="drawer"
          ></iframe>
        </Drawer>
      )}
    </>
  );
};

export default TablasCli;
