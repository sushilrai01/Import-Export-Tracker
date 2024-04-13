import { Box, Pagination } from "@mui/material";

export default function AppPagination(props) {
  const { totalPage, page, handlePageChange } = props;
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display={"flex"}
      sx={{ margin: "20px 0px" }}
    >
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
