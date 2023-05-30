import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const NuevoCliente = () => {
  const { setIsDrawerVisibleForm } = useContext(GlobalContext);

  const handleCrearCliente = (values) => {
    console.log("Formulario enviado:", values);
    setIsDrawerVisibleForm(false);
  };

  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        onFinish={handleCrearCliente}
        style={{ marginLeft: "35px" }}
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
              <Input style={{ width: "220px" }} />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item label="Sector" name="sector">
              <Select style={{ width: "170px" }}>
                <Select.Option value="AGRICULTURA">AGRICULTURA</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tipo Clientes" name="tipoClientes">
              <Select style={{ width: "170px" }}>
                <Select.Option value="NO SOCIO">NO SOCIO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tamaño" name="tamano">
              <Select style={{ width: "170px" }}>
                <Select.Option value="MEDIANO">MEDIANO</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Zona" name="zona">
              <Select style={{ width: "170px" }}>
                <Select.Option value="SANTA ROSA">SANTA ROSA</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Centro" name="centro">
              <Select style={{ width: "170px" }}>
                <Select.Option value="TERCEROS">TERCEROS</Select.Option>
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
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            CREAR NUEVO CLIENTE
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NuevoCliente;
