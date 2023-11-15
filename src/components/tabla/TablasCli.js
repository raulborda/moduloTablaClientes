/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, Input, Radio, Select, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined } from "@ant-design/icons";
import TablaInfo from "./TablaInfo";
import TablaProduc from "./TablaProduc";
import TablaRubros from "./TablaRubros";
import NuevoLead from "../nuevoLead/NuevoLead";

const TablasCli = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;

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
    idUsu,
    setSwitchTables,
    setActualizarData, 
    actualizarData
  } = useContext(GlobalContext);

  const urlParams = new URLSearchParams(window.location.search);

  const [status, setStatus] = useState(urlParams.get("status") || "1");

  const [clientesInactivos, setClientesInactivos] = useState([]);

  const { Option } = Select;

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
    setSwitchTables(true);
  };

  const items = [
    {
      key: "1",
      label: "INFORMATIVA",
      children: (
        <TablaInfo status={status} clientesInactivos={clientesInactivos} />
      ),
    },
    {
      key: "2",
      label: "PRODUCTIVA COMERCIAL",
      children: (
        <TablaProduc status={status} clientesInactivos={clientesInactivos} />
      ),
    },
    {
      key: "3",
      label: "PRODUCTIVA POR RUBRO",
      children: (
        <TablaRubros status={status} clientesInactivos={clientesInactivos} />
      ),
    },
  ];

  const handleStatusChange = (v) => {
    let currentUrl = window.location.href;

    // checkea si exiten parametros
    if (currentUrl.includes("status=")) {
      // Si existe, reemplace
      currentUrl = currentUrl.replace(/status=\d+/, `status=${v}`);
    } else {
      // Si no existe, agregar el parametro
      currentUrl += currentUrl.includes("?") ? `&status=${v}` : `?status=${v}`;
    }

    window.history.replaceState({}, "", currentUrl);
    setStatus(v);
  };

  useEffect(() => {
    fetch(`${URLDOS}etiquetaVistaCliente.php`, {
      method: "GET",
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setEtiquetasSistema(objetoData);
      });
    });
  }, []);

  useEffect(() => {
    const data = new FormData();
    data.append("idU", idUsu);

    fetch(`${URLDOS}tablaInfoInact.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        if (Array.isArray(objetoData)) setClientesInactivos(objetoData);
      });
    });
  }, []);

  const onCloseDrawerCli = () => {
    setActualizarData(!actualizarData)
    setIsDrawerVisible(false);
  };

  return (
    <>
      <div className="div_wrapper">
        <div className="clientes-header" style={{}}>
          <h1 className="titulos">CLIENTES</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Radio.Group
              buttonStyle="solid"
              optionType="button"
              value={status}
              onChange={(v) => handleStatusChange(v.target.value)}
              options={[
                { label: "Todos los clientes", value: "1" },
                { label: "Clientes sin actividad", value: "0" },
              ]}
            />
            <Select
              mode="multiple"
              placeholder="Filtrar por etiquetas"
              style={{ width: "230px" }}
              value={etiquetasSelec}
              onChange={setEtiquetasSelec}
            >
              {etiquetasSistema?.map((etiquet) => (
                <Option key={etiquet?.etq_id} value={etiquet?.etq_nombre}>
                  {etiquet?.etq_nombre.toUpperCase()}
                </Option>
              ))}
            </Select>

            <Input
              style={{ width: "200px", height: "32px" }}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar por cliente o cuenta"
            />
            <Button
              type="primary"
              style={{
                width: "100px",
                padding: "0px",
                borderRadius: "0px",
              }}
              onClick={showDrawer}
            >
              Nuevo Lead
            </Button>
          </div>
        </div>

        <Drawer
          title="Nuevo lead"
          open={isDrawerVisibleForm}
          onClose={closeDrawer}
          width={420}
          closeIcon={<CustomCloseIcon />}
        >
          <NuevoLead />
        </Drawer>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          items={items}
          onChange={handleCambio}
        />
      </div>
      {selectedCliente && selectedCliente.cuenta !== "" && (
        <Drawer
          className="drawerCli"
          open={isDrawerVisible}
          onClose={onCloseDrawerCli}
          placement="bottom"
          height={"100%"}
          style={{ whiteSpace: "nowrap" }}
          closeIcon={
            <CloseOutlined
              style={{ position: "absolute", top: "8px", right: "8px" }}
            />
          }
          bodyStyle={{padding:"10px"}}
        >
          <iframe
            loading="lazy"
            src={`${URLDOS}vista_cliente/?idC=${cliSelect}`}
            width={"100%"}
            style={{ border: "none", height: "calc(100% - 10px)" }}
            title="drawer"
          ></iframe>
        </Drawer>
      )}
    </>
  );
};

export default TablasCli;
