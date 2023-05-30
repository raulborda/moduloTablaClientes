import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const NuevoCliente = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const { idUsu, setIsDrawerVisibleForm } = useContext(GlobalContext);

  const [sector, setSector] = useState(null);
  const [tamaño, setTamaño] = useState(null);
  const [tiposCliente, setTiposClientes] = useState(null);
  const [grupoUno, setGrupoUno] = useState(null);
  const [grupoDos, setGrupoDos] = useState(null);


  const cargarSector = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}sectorCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setSector(objetoData);
      });
    });
  };

  const cargarTamaño = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}tamanoCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setTamaño(objetoData);
      });
    });
  };

  const cargarTipClientes = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}tiposCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setTiposClientes(objetoData);
      });
    });
  };

  const cargarGruUno = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}gruUnoCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setGrupoUno(objetoData);
      });
    });
  };

  const cargarGruDos = () => {
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}gruDosCli.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setGrupoDos(objetoData);
      });
    });
  };

  useEffect(() => {

    cargarSector();

    cargarTamaño();

    cargarTipClientes();

    cargarGruUno();

    cargarGruDos();

  }, []);

//   console.log("sectores: ", sector);
//   console.log("tamaño: ", tamaño);
//   console.log("tiposCliente: ", tiposCliente);
//   console.log("sectores: ", grupoUno);
//   console.log("sectores: ", grupoDos);


  //* FUNCION QUE CARGA LOS DATOS DE UNA NUEVA COSECHA
  function nuevoCli(values) {
    console.log("Formulario enviado:", values);

    setIsDrawerVisibleForm(false);
  }

  return (
    <>
      <Form
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        onFinish={nuevoCli}
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
            <Form.Item label="Act. Comercial" name="sector">
            {sector ? (
              <Select style={{ width: "170px" }}>
                {sector.map((sec) => (
                  <Select.Option key={sec.sec_id} value={sec.sec_id}>
                    {sec.sec_desc}
                  </Select.Option>
                ))}
              </Select>
            ):(
                <Select.Option value="CARGANDO">CARGANDO OPCIONES...</Select.Option>
            )}
            </Form.Item>
            <Form.Item label="Tipo Clientes" name="tipoClientes">
            {tiposCliente ? (
              <Select style={{ width: "170px" }}>
                {tiposCliente.map((tip) => (
                  <Select.Option key={tip.tip_id} value={tip.tip_id}>
                    {tip.tip_desc}
                  </Select.Option>
                ))}
              </Select>
            ):(
                <Select.Option value="CARGANDO">CARGANDO OPCIONES...</Select.Option>
            )}
            </Form.Item>
            <Form.Item label="Tamaño" name="tamano">
            {tamaño ? (
              <Select style={{ width: "170px" }}>
                {tamaño.map((tam) => (
                  <Select.Option key={tam.tam_id} value={tam.tam_id}>
                    {tam.tam_desc}
                  </Select.Option>
                ))}
              </Select>
            ):(
                <Select.Option value="CARGANDO">CARGANDO OPCIONES...</Select.Option>
            )}
            </Form.Item>
            <Form.Item label="Zona" name="zona">
            {grupoUno ? (
              <Select style={{ width: "170px" }}>
                {grupoUno.map((uno) => (
                  <Select.Option key={uno.gruuno_id} value={uno.gruuno_id}>
                    {uno.gruuno_desc}
                  </Select.Option>
                ))}
              </Select>
            ):(
                <Select.Option value="CARGANDO">CARGANDO OPCIONES...</Select.Option>
            )}
            </Form.Item>
            <Form.Item label="Centro" name="centro">
            {grupoDos ? (
              <Select style={{ width: "180px" }}>
                {grupoDos.map((dos) => (
                  <Select.Option key={dos.grudos_id} value={dos.grudos_id}>
                    {dos.grudos_desc}
                  </Select.Option>
                ))}
              </Select>
            ):(
                <Select.Option value="CARGANDO">CARGANDO OPCIONES...</Select.Option>
            )}
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
