/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Spin, Table } from "antd";
import "./style.css";

const TablaProduc = () => {
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
    isLoadingTP,
    setIsLoadingTP,
    setIsLoadingTI,
    activeTab,
  } = useContext(GlobalContext);

  //const [isTotalRow, setIsTotalRow] = useState(false);

  const cargarTablaInfo = () => {
    setIsLoadingTP(true); // Establecer isLoadingTP en true antes de hacer la solicitud
    const data = new FormData();
    data.append("idU", idUsu);
    fetch(`${URLDOS}tablaProduct.php`, {
      method: "POST",
      body: data,
    }).then(function (response) {
      response.text().then((resp) => {
        const data = resp;
        const objetoData = JSON.parse(data);
        setInfoclientes(objetoData);
        setIsLoadingTP(false); // Establecer isLoadingTP en false después de recibir la respuesta
        setIsLoadingTI(true); // Establecer isLoadingTI en false el spin de tabla informacion
        setIsLoadingTR(true); // Establecer isLoadingTP en false el spin de tabla rubro
      });
    });
  };

  //* PARA ORDENAR LOS VALORES EN LA TABLA, TENIENDO EN CUENTA LOS CARACTERES ESPECIALES Y LETRAS
  const convertToNumber = (value) => {
    const cleanedString = value
      .replace(/[^0-9.,S/D]+/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".");
    return cleanedString === "S/D"
      ? Number.MIN_SAFE_INTEGER
      : parseFloat(cleanedString);
  };

  const sorterWithTotalRow = (a, b, dataIndex) => {
    if (a === totalRow || b === totalRow) {
      return 0; // Si uno de los registros es totalRow, se mantiene en su posición original
    }
    const valueA = convertToNumber(a[dataIndex]);
    const valueB = convertToNumber(b[dataIndex]);
    return valueA - valueB;
  };

  useEffect(() => {
    if (activeTab === "2" && idUsu) {
      cargarTablaInfo();
    }
  }, [activeTab, idUsu]);

  // const rowClassName = (record, index) => {
  //   if (isTotalRow && index === 0) {
  //     return "total-row"; // Agrega una clase CSS para la fila totalRow
  //   }
  //   return "";
  // };

  const columnsProductivo = [
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
        <div
          style={{
            color: "#00b33c",
            maxWidth: "100px", // Ajusta el valor según el ancho deseado
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {/* <Popover content={text}>{text}</Popover> */}
          {text}
        </div>
      ),
      width: "130px",
    },
    {
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "right",
      sorter: (a, b) =>
         sorterWithTotalRow(a, b, "hasTotales"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "HAS. PROP.",
      dataIndex: "propias",
      key: "propias",
      align: "right",
      sorter: (a, b) =>  sorterWithTotalRow(a, b, "propias"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "HAS. ALQ.",
      dataIndex: "alquiladas",
      key: "alquiladas",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "alquiladas"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "COMPRA USD INS.",
      dataIndex: "usdInsumo",
      key: "usdInsumo",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "usdInsumo"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "TT ENTREG.",
      dataIndex: "toneladasEntregadas",
      key: "toneladasEntregadas",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "toneladasEntregadas"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "COMPRA USD ESTIM.",
      dataIndex: "estimadoUSDInsumos",
      key: "estimadoUSD",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "estimadoUSDInsumos"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "TT ESTIM.",
      dataIndex: "estimadoToneladas",
      key: "estimadoToneladas",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "estimadoToneladas"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "NEG. USD ABIERTO",
      dataIndex: "negUSDAbierto",
      key: "negUSDAbierto",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "negUSDAbierto"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "TAREAS ABIERTAS",
      dataIndex: "tareasAbiertas",
      key: "tareasAbiertas",
      align: "right",
      sorter: (a, b) =>
      sorterWithTotalRow(a, b, "tareasAbiertas"),
      sortDirections: ["ascend", "descend"],
    },
  ];

  const handleCliente = (record) => {
    console.log("handleCliente: ",record);
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

  const dataProductivo = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      propias: c.has_propias
        ? typeof c.has_propias === "string"
          ? parseInt(c.has_propias)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_propias
        : "S/D",
      alquiladas: c.has_alquiladas
        ? typeof c.has_alquiladas === "string"
          ? parseInt(c.has_alquiladas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_alquiladas
        : "S/D",
      hasTotales: c.has_totales
        ? typeof c.has_totales === "string"
          ? parseInt(c.has_totales)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_totales
        : "S/D",
      usdInsumo: c.usdEntregados
        ? typeof c.usdEntregados === "string"
          ? parseInt(c.usdEntregados)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.usdEntregados
        : "S/D",
      estimadoUSDInsumos: c.costoEstimado
        ? typeof c.costoEstimado === "string"
          ? parseInt(c.costoEstimado)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.costoEstimado
        : "S/D",
      toneladasEntregadas: c.toneladasEntregadas
        ? typeof c.toneladasEntregadas === "string"
          ? parseInt(c.toneladasEntregadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEntregadas
        : "S/D",
      estimadoToneladas: c.toneladasEstimadas
        ? typeof c.toneladasEstimadas === "string"
          ? parseInt(c.toneladasEstimadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEstimadas
        : "S/D",
      negUSDAbierto: c.suma_neg_valor
        ? typeof c.suma_neg_valor === "string"
          ? parseInt(c.suma_neg_valor)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.suma_neg_valor
        : "S/D",
      tareasAbiertas: c.cantidad_tareas_pendientes
        ? typeof c.cantidad_tareas_pendientes === "string"
          ? parseInt(c.cantidad_tareas_pendientes).toFixed(0)
          : c.cantidad_tareas_pendientes
        : "S/D",
    }))
  );

  const sumColumns = (dataProductivo, columnIndex) => {
    let sum = 0;
    for (let i = 0; i < dataProductivo.length; i++) {
      const value = parseInt(dataProductivo[i][columnIndex].replace(/\./g, "").replace(/,/g, "."), 10);
      if (!isNaN(value)) {
        sum += value;
      }
    }
    return sum.toLocaleString(undefined, {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/,/g, ".");
  };
  
  

  const totalRow = {
    cuenta: "",
    clientes: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>TOTALES</span>,
    propias: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "propias")}</span>,
    alquiladas: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "alquiladas")}</span>,
    hasTotales: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "hasTotales")}</span>,
    usdInsumo: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "usdInsumo")}</span>,
    toneladasEntregadas: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "toneladasEntregadas")}</span>,
    estimadoUSDInsumos: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "estimadoUSDInsumos")}</span>,
    estimadoToneladas: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "estimadoToneladas")}</span>,
    negUSDAbierto: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "negUSDAbierto")}</span>,
    tareasAbiertas: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataProductivo, "tareasAbiertas")}</span>,
  };
  
  //dataProductivo.unshift(totalRow);

  // useEffect(() => {
  //   setIsTotalRow(true);
  // }, [dataProductivo]);

  return (
    <>
      {isLoadingTP ? (
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
          dataSource={dataProductivo}
          columns={columnsProductivo}
          size="small"
          // rowClassName={rowClassName}
          onRow={(record) => ({
            onClick: () => handleCliente(record),
          })}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row style={{backgroundColor: "#f5fef5"}}>
                <Table.Summary.Cell index={0} />
                <Table.Summary.Cell index={1}>{(totalRow.clientes)}</Table.Summary.Cell>
                <Table.Summary.Cell index={2} className="totalCell">
                 {(totalRow.hasTotales)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} className="totalCell">
                  {(totalRow.propias)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} className="totalCell">
                  {(totalRow.alquiladas)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} className="totalCell">
                  {(totalRow.usdInsumo)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} className="totalCell">
                  {(totalRow.toneladasEntregadas)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7} className="totalCell">
                  {(totalRow.estimadoUSDInsumos)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8} className="totalCell">
                  {(totalRow.estimadoToneladas)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9} className="totalCell">
                  {(totalRow.negUSDAbierto)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10} className="totalCell">
                  {(totalRow.tareasAbiertas)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      )}
    </>
  );
};

export default TablaProduc;
