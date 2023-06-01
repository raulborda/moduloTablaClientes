/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

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
  } = useContext(GlobalContext);

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
  const centroFilters = centrosUnicos.map((centro) => ({ text: centro, value: centro }));


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

  const data = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
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
            onClick: () => handleCliente(record),
          })}
        />
      )}
    </>
  );
};

export default TablaInfo;
