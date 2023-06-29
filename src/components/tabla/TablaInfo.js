/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Select, Spin, Table, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AlertOutlined, ReloadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const TablaInfo = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const {
    idUsu,
    infoClientes,
    setInfoclientes,
    searchValue,
    setSelectedCliente,
    setIsDrawerVisible,
    cliSelect,
    setCliSelect,
    setIsLoadingTR,
    setIsLoadingTP,
    isLoadingTI,
    setIsLoadingTI,
    activeTab,
    actualizarData,
    setActualizarData,
    etiquetasSelec,
  } = useContext(GlobalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cliLead, setCliLead] = useState("");
  const [cliAct, setCliAct] = useState({});

  const cargarTablaInfo = () => {
    setIsLoadingTI(true); // Establecer isLoadingTI en true antes de hacer la solicitud
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}tablaInfo.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoclientes(objetoData);
        setIsLoadingTI(false); // Establecer isLoadingTI en false después de recibir la respuesta
        setIsLoadingTP(true); // Establecer isLoadingTI en false el spin de tabla productivo
        setIsLoadingTR(true); // Establecer isLoadingTP en false el spin de tabla rubro
        //console.log(infoClientes);
      });
    });
  };

  useEffect(() => {
    if (activeTab === "1" && idUsu) {
      cargarTablaInfo();
    }
  }, [activeTab, idUsu, actualizarData]);

  const zonasUnicas = [...new Set(infoClientes.map((c) => c.gruuno_desc))];
  const centrosUnicos = [...new Set(infoClientes.map((c) => c.grudos_desc))];

  const zonaFilters = zonasUnicas.map((zona) => ({ text: zona, value: zona }));
  const centroFilters = centrosUnicos.map((centro) => ({
    text: centro,
    value: centro,
  }));

  const columns = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      width: "50px",
    },
    {
      title: "CLIENTE",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <span style={{ color: "#00b33c" }}>{text}</span>
      ),
    },
    {
      title: "ZONA",
      dataIndex: "zonas",
      key: "zonas",
      align: "center",
      filters: zonaFilters,
      onFilter: (value, record) => record.zonas === value,
    },
    {
      title: "CENTRO",
      dataIndex: "centro",
      key: "centro",
      align: "center",
      filters: centroFilters,
      onFilter: (value, record) => record.centro === value,
    },
    {
      title: "PROPIETARIO",
      dataIndex: "propietario",
      key: "propietario",
      align: "center",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "TELEFONO",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
  ];

  const handleCliente = (record) => {
    setSelectedCliente(record);
    setIsDrawerVisible(true);
    setCliSelect(parseInt(record.key));
  };

  const handleActualizarLead = () => {
    console.log(cliLead.cli_id);
    console.log(cliAct);

    const data = new FormData();
    data.append("lead", Number(cliLead.cli_id));
    data.append("idCli", Number(cliAct));
    fetch(`${URLDOS}tablaClientes_actualizarLeadCliente.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        //console.log(objetoData);
        notification.open({
          message: "LEAD CONVERTIDO",
          description: "DATOS ACTUALIZADOS CORRECTAMENTE",
          duration: 3,
          placement: "bottomRight",
          icon: <AlertOutlined style={{ color: "#52c41a" }} />,
          style: {
            borderRadius: "4px",
            backgroundColor: "#f6ffed",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          },
        });
      });
    });

    setIsModalVisible(false);
    setActualizarData(!actualizarData);
  };

  localStorage.setItem("cliSelect", cliSelect);

  const filterData = (data) => {
    if (!infoClientes || searchValue === "") {
      return data;
    }
    return data.filter((item) => {
      return (
        item.clientes &&
        (item.clientes.toUpperCase().includes(searchValue.toUpperCase()) ||
          item.cuenta?.toString().includes(searchValue))
      );
    });
  };

  const filtrarClientes = () => {
    return infoClientes.filter((cliente) => {
      if (etiquetasSelec.length > 0) {
        const etiquetaCliente = cliente.etiqueta
          ? cliente.etiqueta.split(",")
          : [];
        const intersec = etiquetaCliente.filter((etq) =>
          etiquetasSelec.includes(etq.trim())
        );

        if (intersec.length === 0) {
          return false;
        }
      }
      return true;
    });
  };

  const data = filterData(
    //infoClientes.map((c, index) => ({
    filtrarClientes().map((c, index) => ({
      key: c.cli_id,
      cuenta:
        c.cli_idsistema === "0" ? (
          <>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className="selected_tag"
                style={{ background: "#56b43c", display: "inline-block" }}
              >
                <span className="etq_name">{"LEAD".toUpperCase()}</span>
              </div>
              <ReloadOutlined
                style={{
                  color: "#56b43c",
                  fontSize: "small",
                  padding: "0px",
                  marginLeft: "5px",
                }}
                onClick={() => (
                  setIsModalVisible(true), setCliLead(c)
                )}
              />
            </div>
          </>
        ) : (
          c.cli_idsistema
        ),
      clientes: c.cli_nombre,
      zonas: c.gruuno_desc,
      centro: c.grudos_desc,
      propietario: c.usu_nombre,
      email: c.cli_email1,
      telefono: c.cli_telefono1,
    }))
  );


  const clientesOptions = infoClientes
  ? infoClientes
      .filter((cliente) => cliente.cli_idsistema != 0)
      .map((cliente) => (
        <Option key={cliente.cli_id} value={cliente.cli_id}>
          {cliente.cli_nombre}
        </Option>
      ))
  : null;

  return (
    <>
      {isLoadingTI ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          onRow={(record) => ({
            onClick: (event) => {
              if (event.target.tagName !== "SPAN") {
                // Verificar si el clic no se hizo en el elemento <span> del nombre del cliente
                return;
              }
              handleCliente(record);
            },
          })}
        />
      )}

      {isModalVisible ? (
        <Modal
          title="CONVERTIR LEAD A CLIENTE"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleActualizarLead()}
            >
              Actualizar
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              className="selected_tag"
              style={{ background: "#56b43c", display: "inline-block" }}
            >
              <span className="etq_name" style={{ fontWeight: "bold" }}>
                LEAD
              </span>
            </div>

            <span style={{ marginLeft: "5px" }}>{cliLead.cli_nombre}</span>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                marginBottom: "5px",
              }}
            >
              Seleccione Cliente:
            </label>
            <Select
              style={{ minWidth: "250px" }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option && option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(option) => setCliAct(option)}
            >
              {clientesOptions}
            </Select>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default TablaInfo;
