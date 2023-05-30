/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./style.css";

const NuevoCliente = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const formRef = useRef(null);

  const { idUsu, setIsDrawerVisibleForm, actualizarData, setActualizarData } =
    useContext(GlobalContext);

  const initialValues = {
    razonSocial: "",
    descripcion: "",
    telefono: "",
    celular: "",
    cuit: "",
    email: "",
    sector: undefined,
    tipoClientes: undefined,
    tamano: undefined,
    zona: undefined,
    centro: undefined,
  };

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

  //* FUNCION QUE CARGA LOS DATOS DE UN NUEVO CLIENTE
  function nuevoCli(values) {
    const data = new FormData();
    data.append("idUsu", idUsu);
    data.append("razonSocial", values.razonSocial);
    data.append("descripcion", values.descripcion);
    data.append("telefono", values.telefono);
    data.append("celular", values.celular);
    data.append("cuit", values.cuit);
    data.append("email", values.email);
    data.append("sector", values.sector);
    data.append("tipoClientes", values.tipoClientes);
    data.append("tamano", values.tamano);
    data.append("zona", values.zona);
    data.append("centro", values.centro);
    fetch(`${URLDOS}nuevoCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        console.log(data);
      });
    });

    // Limpiar el formulario
    formRef.current.setFieldsValue(initialValues);

    setIsDrawerVisibleForm(false);
    setActualizarData(!actualizarData);
  }

  return (
    <>
      <Form
        ref={formRef}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        onFinish={nuevoCli}
        style={{ marginLeft: "35px" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "20px" }}>
            <Form.Item
              label="Razón Social"
              name="razonSocial"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la razón social",
                },
              ]}
              className="hidden-asterisk"
            >
              <Input />
            </Form.Item>
            <Form.Item label="Descripción" name="descripcion">
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Teléfono"
              name="telefono"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el teléfono",
                },
              ]}
              className="hidden-asterisk"
            >
              <Input style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item
              label="Celular"
              name="celular"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el celular",
                },
              ]}
              className="hidden-asterisk"
            >
              <Input style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item
              label="CUIT"
              name="cuit"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el cuit",
                },
              ]}
              className="hidden-asterisk"
            >
              <Input style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el email",
                },
              ]}
              className="hidden-asterisk"
            >
              <Input style={{ width: "220px" }} />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <Form.Item
              label="Act. Comercial"
              name="sector"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione la act. Comercial",
                },
              ]}
              className="hidden-asterisk"
            >
              {sector ? (
                <Select style={{ width: "170px" }}>
                  {sector.map((sec) => (
                    <Select.Option key={sec.sec_id} value={sec.sec_id}>
                      {sec.sec_desc}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select.Option value="CARGANDO">
                  CARGANDO OPCIONES...
                </Select.Option>
              )}
            </Form.Item>
            <Form.Item
              label="Tipo Clientes"
              name="tipoClientes"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el tipo de Cliente",
                },
              ]}
              className="hidden-asterisk"
            >
              {tiposCliente ? (
                <Select style={{ width: "170px" }}>
                  {tiposCliente.map((tip) => (
                    <Select.Option key={tip.tip_id} value={tip.tip_id}>
                      {tip.tip_desc}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select.Option value="CARGANDO">
                  CARGANDO OPCIONES...
                </Select.Option>
              )}
            </Form.Item>
            <Form.Item
              label="Tamaño"
              name="tamano"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el tamaño",
                },
              ]}
              className="hidden-asterisk"
            >
              {tamaño ? (
                <Select style={{ width: "170px" }}>
                  {tamaño.map((tam) => (
                    <Select.Option key={tam.tam_id} value={tam.tam_id}>
                      {tam.tam_desc}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select.Option value="CARGANDO">
                  CARGANDO OPCIONES...
                </Select.Option>
              )}
            </Form.Item>
            <Form.Item
              label="Zona"
              name="zona"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione la zona",
                },
              ]}
              className="hidden-asterisk"
            >
              {grupoUno ? (
                <Select style={{ width: "170px" }}>
                  {grupoUno.map((uno) => (
                    <Select.Option key={uno.gruuno_id} value={uno.gruuno_id}>
                      {uno.gruuno_desc}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select.Option value="CARGANDO">
                  CARGANDO OPCIONES...
                </Select.Option>
              )}
            </Form.Item>
            <Form.Item
              label="Centro"
              name="centro"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione el centro",
                },
              ]}
              className="hidden-asterisk"
            >
              {grupoDos ? (
                <Select style={{ width: "180px" }}>
                  {grupoDos.map((dos) => (
                    <Select.Option key={dos.grudos_id} value={dos.grudos_id}>
                      {dos.grudos_desc}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Select.Option value="CARGANDO">
                  CARGANDO OPCIONES...
                </Select.Option>
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
            bottom: "0",
            width: "100%",
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            GUARDAR NUEVO LEAD
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NuevoCliente;
