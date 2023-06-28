/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { ReloadOutlined } from "@ant-design/icons";

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
    etiquetasSelec,
  } = useContext(GlobalContext);

  //console.log(etiquetasSelec)

  const [isModalVisible, setIsModalVisible] = useState(false);

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
              <Button
              style={{width:"23px", height:"23px", paddingTop:"0px", marginTop:"-1px"}}
                icon={<ReloadOutlined
                  style={{ color: "#56b43c", fontSize:"small", padding:"0px"}}
                  onClick={() => setIsModalVisible(true)}
                />}
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
          title="Actualizar cliente"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => setIsModalVisible(false)}
            >
              Actualizar
            </Button>
          ]}
        >
          <p>Aquí puedes agregar el contenido del modal.</p>
        </Modal>
      ) : (null)}
    </>
  );
};

export default TablaInfo;
