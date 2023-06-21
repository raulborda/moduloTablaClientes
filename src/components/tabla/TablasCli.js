/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Input, Select, Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined } from "@ant-design/icons";
import TablaInfo from "./TablaInfo";
import TablaProduc from "./TablaProduc";
import TablaRubros from "./TablaRubros";
import NuevoCliente from "../nuevoCliente/NuevoCliente";

const TablasCli = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;
  //console.log("url: ", URL);

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
    etiquetasSistema,
    setEtiquetasSistema,
    etiquetasSelec,
    setEtiquetasSelec,
  } = useContext(GlobalContext);

  const { Option } = Select;

  //const [etiquetasSelec, setEtiquetasSelec] = useState([]);

  const showDrawer = () => {
    setIsDrawerVisibleForm(true);
  };

  const closeIconStyle = {
    position: "absolute",
    top: "18px",
    right: "20px",
  };

  const CustomCloseIcon = ({ onClick }) => (
    <div style={closeIconStyle} onClick={onClick}>
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

  useEffect(() => {
    const data = new FormData();
    fetch(`${URLDOS}etiquetaVistaCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setEtiquetasSistema(objetoData);
      });
    });
  }, []);

  console.log(etiquetasSelec);

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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              mode="multiple"
              placeholder="Filtrar por etiquetas"
              style={{ width: "230px", marginRight: "12px" }}
              value={etiquetasSelec}
              onChange={setEtiquetasSelec}
            >
              {etiquetasSistema?.map((etiquet) => (
                <Option key={etiquet?.tag_id} value={etiquet?.tag_desc}>
                  {etiquet?.tag_desc}
                </Option>
              ))}
            </Select>

            <Input
              style={{ width: "200px", height: "33px" }}
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
          open={isDrawerVisibleForm}
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
      {selectedCliente && selectedCliente.cuenta !== "" && (
        <Drawer
          open={isDrawerVisible}
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
