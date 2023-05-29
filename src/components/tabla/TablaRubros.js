/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const TablaRubros = () => {
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
    isLoadingTR,
    setIsLoadingTR,
    setIsLoadingTP,
    setIsLoadingTI,
    activeTab,
  } = useContext(GlobalContext);

  const cargarTablaInfo = () => {
    setIsLoadingTR(true); // Establecer isLoadingTR en true antes de hacer la solicitud
      const data = new FormData();
      data.append("idU", idUsu);
      fetch(`${URLDOS}tablaRubro.php`, {
        method: "POST",
        body: data,
      }).then(function (response) {
        response.text().then((resp) => {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoclientes(objetoData);
          setIsLoadingTR(false); // Establecer isLoadingTR en false después de recibir la respuesta
          setIsLoadingTI(true); // Establecer isLoadingTI en false el spin de tabla informacion
          setIsLoadingTP(true); // Establecer isLoadingTP en false el spin de tabla productivo
        });
      });
  };

  useEffect(() => {
    if (activeTab === "3" && idUsu) {
      cargarTablaInfo();
    }
  }, [activeTab, idUsu]);


  const columnsRubros = [
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
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "right",
    },
    {
      title: "AGRICULTURA",
      dataIndex: "agricultura",
      key: "agricultura",
      align: "right",
    },
    {
      title: "GANADERIA",
      dataIndex: "ganaderia",
      key: "ganaderia",
      align: "right",
    },
    {
      title: "TAMBO",
      dataIndex: "tambo",
      key: "tambo",
      align: "right",
    },
    {
      title: "MIXTO",
      dataIndex: "mixto",
      key: "mixto",
      align: "right",
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

  const numberFormatOptions = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const dataRubros = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      hasTotales: c.has_totales
        ? typeof c.has_totales === "string"
          ? parseInt(c.has_totales)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_totales
        : "-",
      agricultura: c.Agricultura
        ? typeof c.Agricultura === "string"
          ? parseInt(c.Agricultura)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Agricultura
        : "-",
      ganaderia: c.Ganaderia
        ? typeof c.Ganaderia === "string"
          ? parseInt(c.Ganaderia)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Ganaderia
        : "-",
      tambo: c.Tambo
        ? typeof c.Tambo === "string"
          ? parseInt(c.Tambo)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Tambo
        : "-",
      mixto: c.Mixto
        ? typeof c.Mixto === "string"
          ? parseInt(c.Mixto)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Mixto
        : "-",
    }))
  );

  return (
    <>
      {isLoadingTR ? (
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
          dataSource={dataRubros}
          columns={columnsRubros}
          size="middle"
          onRow={(record) => ({
            onClick: () => handleCliente(record),
          })}
        />
      )}
    </>
  );
};

export default TablaRubros;
