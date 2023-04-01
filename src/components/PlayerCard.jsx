import { useEffect, useState } from "react";
import axios from "axios";
import "./PlayerCard.css";
import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input
} from "reactstrap";

const PlayerCard = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("player-data", data);
  const filteredData = data?.playerList?.filter(
    (item) =>
      item.PFName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.TName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Input
        className="inputtype"
        type="text"
        placeholder="Search Player List Based on TName And PFName"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredData?.length > 0 ? (
        <div className="cards-item" style={{ gridColumn: "span 4" }}>
          {filteredData.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  className="card-body"
                  style={{
                    width: "18rem"
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5"> Full Name :- {item.PFName}</CardTitle>
                    <p>Players Value :- {item.Value}</p>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      ID :- {item.Id}
                    </CardSubtitle>
                  </CardBody>
                  <img
                    alt="Player-images"
                    src={`${item.Id}.jpg`}
                    width="100%"
                  />
                  <CardBody>
                    <CardText>
                      <h5>Upcoming Matches:</h5>
                      <>
                        {item.UpComingMatchesList?.map((match, index) => (
                          <p key={index}>
                            {match.CCode} vs {match.VsTID}{" "}
                            <p> {match.MDate} </p>
                          </p>
                        ))}
                      </>
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default PlayerCard;
