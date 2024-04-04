namespace ImportExportTracker.MODEL.Common
{
    public class CommonModel<T>
    {
        public CommonModel()
        {
            this.List = new List<T>();
            Page = new PaginationModel();
        }
        public List<T> List { get; set; }
        //public FilterModel Filter { get; set; }
        public PaginationModel Page { get; set; }
       
        public class PaginationModel
        {
            public PaginationModel()
            {
                this.PageSize = 5;
            }
            public int CurrentPageNumber { get; set; }
            public int TotalPageNumber { get; set; }
            public int TotalRecords { get; set; }
            public int PageSize { get; set; }
            public int StartSerialNo { get; set; }
        }
    }
}
