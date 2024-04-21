import React from "react";

export default function TopImportsTable(props) {
  const { categories, commodities } = props;
  return (
    <>
      <div className="row my-3">
        <div className="card">
          <div className="col-md-12">
            <h4>TOP 5 IMPORT BY CATEGORY</h4>
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Category</th>
                    <th>Fiscal Year</th>
                    <th>Total Quantity</th>
                    <th>Total Import Value</th>
                    <th>Total Import Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {categories != null &&
                    categories.map((cat, i) => (
                      <tr key={i}>
                        <td>{1 + i}</td>
                        <td>{cat.categoryTitle}</td>
                        <td>{cat.fiscalYearTitle}</td>
                        <td>{cat.totalQuantity}</td>
                        <td>{cat.totalImportValue}</td>
                        <td>{cat.totalImportRevenue}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card my-3">
          <div className="col-md-12">
            <h4>TOP 5 IMPORT BY COMMODITY</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Category</th>
                  <th>Commodity Name</th>
                  <th>HSCODE</th>
                  <th>Fiscal Year</th>
                  <th>Total Quantity</th>
                  <th>Total Import Value</th>
                  <th>Total Import Revenue</th>
                </tr>
              </thead>
              <tbody>
                {commodities != null &&
                  commodities.map((item, i) => (
                    <tr key={i}>
                      <td>{1 + i}</td>
                      <td>{item.categoryTitle}</td>
                      <td>{item.commodityName}</td>
                      <td>{item.hsCode}</td>
                      <td>{item.fiscalYearTitle}</td>
                      <td>{item.totalQuantity}</td>
                      <td>{item.totalImportValue}</td>
                      <td>{item.totalImportRevenue}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
