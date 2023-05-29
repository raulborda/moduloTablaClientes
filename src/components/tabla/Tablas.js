/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Drawer,
  Input,
  Tabs,
  Form,
  Select,
  Divider,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined } from "@ant-design/icons";
import TablaInfo from "./TablaInfo";
import TablaProduc from "./TablaProduc";
import TablaRubros from "./TablaRubros";
import TextArea from "antd/es/input/TextArea";

const TablasCli = () => {
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
  } = useContext(GlobalContext);

  const [isDrawerVisibleForm, setIsDrawerVisibleForm] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisibleForm(true);
  };

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

  const handleCrearCliente = (values) => {
    console.log("Formulario enviado:", values);
    setIsDrawerVisibleForm(false);
  };

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
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
            onFinish={handleCrearCliente}
            style={{ marginLeft:"35px" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: "20px" }}>
                <Form.Item label="Razón Social" name="razonSocial">
                  <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion">
                  <TextArea />
                </Form.Item>
                <Form.Item label="Teléfono" name="telefono">
                  <Input style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item label="Celular" name="celular">
                  <Input style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item label="CUIT" name="cuit">
                  <Input style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>
                <Form.Item label="Sector" name="sector">
                  <Select style={{ width: "150px" }}>
                    <Select.Option value="demo">AGRICULTURA</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Tipo Clientes" name="tipoClientes">
                  <Select style={{ width: "150px" }}>
                    <Select.Option value="demo">NO SOCIO</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Tamaño" name="tamano">
                  <Select style={{ width: "150px" }}>
                    <Select.Option value="demo">MEDIANO</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Zona" name="zona">
                  <Select style={{ width: "150px" }}>
                    <Select.Option value="demo">SANTA ROSA</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Centro" name="centro">
                  <Select style={{ width: "150px" }}>
                    <Select.Option value="demo">TERCEROS</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <Divider style={{ marginTop: "20px" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button type="primary" htmlType="submit" style={{width:"300px"}}>
                CREAR
              </Button>
            </div>
          </Form>
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
      {selectedCliente && (
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
            src={`${URL}/tati/modulos/vista_cliente/?idC=${cliSelect}`}
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
