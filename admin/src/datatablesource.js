export const userColumns = [
  { field: "_id", headerName: "ID", width: 120 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "User",
    width: 230,
    
    
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "slug",
    headerName: "Slug",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "description",
    headerName: "description",
    width: 100,
  },
  {
    field: "countInStock",
    headerName: "CountInStock",
    width: 100,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 100,
  },
  {
    field: "numReviews",
    headerName: "NumReviews",
    width: 100,
  },
  
  
  
];

export const courseColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "course",
    headerName: "Course",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "desc",
    headerName: "Desc",
    width: 100,
  },
  {
    field: "field",
    headerName: "Field",
    width: 100,
  },
  {
    field: "teacher",
    headerName: "Teacher",
    width: 100,
  },
  
];



export const eventColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "photos",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
     
     
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={(params.row.photos[0])||  "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },


  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "club",
    headerName: "Club",
    width: 100,
  },
  {
    field: "club",
    headerName: "Club",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Desc",
    width: 100,
  }


  
];

