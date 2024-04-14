import { Box, Pagination } from "@mui/material";

export default function AppPagination(props) {
  const { totalPage, page, handlePageChange, getFromPagination } = props;
  const pageSizeOptions = [5, 10, 25, 50, 100];

  function onPageSizeChange(value) {
    console.log("hello", value);
    getFromPagination(value);
  }

  return (
    <Box
      justifyContent="right"
      alignItems="center"
      display={"flex"}
      sx={{ margin: "5px 0px" }}
    >
      <span className="mr-3">Select Rows:</span>
      <div className="dropdown-center ml-3">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={(e) => onPageSizeChange(e.target.value)}
        >
          {pageSizeOptions.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        {/* <ul className="dropdown-menu">
          {pageSizeOptions.map((item, index) => {
            return (
              <li key={index}>
                <a
                  className="dropdown-item pe-auto"
                  value={item}
                  onClick={(e) => onPageSizeChange(e.target.value)}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul> */}
      </div>
      <Pagination
        count={totalPage}
        color="primary"
        size="large"
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
