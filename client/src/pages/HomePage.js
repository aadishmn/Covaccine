import React from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { useState, useEffect } from "react";
import { DatePicker, message, TimePicker } from "antd";
function HomePage() {
  const [newcenters, setnewCenters] = useState([]);
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [CenterSearchVal, setCenterSearchVal] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    getCenters();
    // console.log("j");
  }, [center]);
  const getCenters = async () => {
    try {
      const headers = {
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      };
      const res = await axios.get("http://localhost:8080/api/v1/user/centers", {
        headers,
      });

      if (res.data.success) {
        setCenters([...res.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    if (searchVal == "" && setCenterSearchVal == "") {
      setCenters([centers]);
    }
    //console.log(centers);
    const filterVal = centers.filter(
      (item) =>
        item.address
          .toString()
          .toLowerCase()
          .includes(searchVal.toLowerCase()) &&
        item.centerName
          .toString()
          .toLowerCase()
          .includes(CenterSearchVal.toLowerCase())
    );

    setnewCenters(filterVal);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="City"
        onChange={(e) => {
          setSearchVal(e.target.value);
          handleSearch(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="center name"
        onChange={(e) => setCenterSearchVal(e.target.value)}
      />

      <DatePicker
        aria-required={"true"}
        className="m-2"
        format="DD-MM-YYYY"
        onChange={(value) => {
          setDate(value.format("DD-MM-YYYY"));
        }}
      />
      <TimePicker
        aria-required={"true"}
        format="HH:mm"
        className="mt-3"
        onChange={(value) => {
          setTime(value.format("HH:mm"));
        }}
      />

      <TimePicker
        aria-required={"true"}
        format="HH:mm"
        className="mt-3"
        onChange={(value) => {
          setTime(value.format("HH:mm"));
        }}
      />

      <button onClick={handleSearch}>Search</button>
      <>
        <table>
          <tbody>
            {newcenters.map((center, _id) => {
              return (
                <tr key={_id}>
                  <td>
                    <h1>{center.centerName}</h1>
                  </td>
                  <td>
                    <h1>{center.address}</h1>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default HomePage;
