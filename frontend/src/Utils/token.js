import jwtDecode from "jwt-decode";

export const GetTablesFromToken = () => {
    const token = localStorage.getItem("token");
    return jwtDecode(token)?.tableName || [];
}

export const GetUserNameFromToken = () => {
    const token = localStorage.getItem("token");
    return jwtDecode(token)?.userName || "";
}
