/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Drawer,
  Input,
  Tabs,
  Modal,
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});

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

  const handleNuevoCliente = () => {
    setIsModalVisible(true);
  };

  const handleCrearCliente = () => {
    // Realiza las operaciones necesarias para crear un nuevo cliente
    // Guarda los datos del formulario en el estado o realiza las llamadas API correspondientes

    // Cierra el modal
    setIsModalVisible(false);
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
              onClick={handleNuevoCliente}
            >
              Nuevo Lead
            </Button>
          </div>
        </div>

        <Modal
          title="Nuevo Cliente"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          style={{ marginTop: "-50px" }}
          width={800}
        >
          <Divider style={{marginTop:"-5px", width:"800px", marginLeft:"-23px"}}/>
          <>
            <div>
              <div>
                <Form
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}
                  layout="vertical"
                >
                  <div style={{ display: "flex", marginLeft:"10px", marginTop:"10px"  }}>
                    <div style={{ flex: 1 }}>
                      <Form.Item label="Razón Social">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Descripción">
                        <TextArea />
                      </Form.Item>
                      <Form.Item label="Telefono">
                        <Input style={{ width: "150px" }} />
                      </Form.Item>
                      <Form.Item label="Celular">
                        <Input style={{ width: "150px" }} />
                      </Form.Item>
                     
                    </div>
                    <div style={{ flex: 1, marginLeft:"10px", }}>
                      <Form.Item label="CUIT">
                        <Input style={{ width: "150px" }} />
                      </Form.Item>
                      <Form.Item label="Sector">
                        <Select style={{ width: "150px" }}>
                          <Select.Option value="demo">AGRICULTURA</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Tipo Clientes">
                        <Select style={{ width: "150px" }}>
                          <Select.Option value="demo">NO SOCIO</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Email">
                        <Input />
                      </Form.Item>
                    </div>
                    <div style={{ flex: 1, marginLeft:"-25px" }}>
                    <Form.Item label="Tamaño">
                        <Select style={{ width: "150px" }}>
                          <Select.Option value="demo">MEDIANO</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Zona">
                        <Select style={{ width: "150px" }}>
                          <Select.Option value="demo">SANTA ROSA</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Centro">
                        <Select style={{ width: "150px" }}>
                          <Select.Option value="demo">TERCEROS</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
              <Divider style={{width:"800px", marginLeft:"-23px"}}/>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="primary" onClick={handleCrearCliente}>
                  Crear
                </Button>
              </div>
            </div>
          </>
        </Modal>

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
