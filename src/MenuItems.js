import React from "react";
import axios from "axios";
import Login from "./Login";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class MenuItems extends React.Component {
  constructor(props) {
    super(props);
    //let { user } = this.props.appstate;
    this.state = {
      items: [],
      appID: process.env.REACT_APP_SIP_PORTAL_APP_ID,
      sipURL: process.env.REACT_APP_SIP_PORTAL
    };
    let itemsList = this.getMenuItems();
  }

  getMenuItems() {
    axios
      .get(this.state.sipURL + `getUserAccessMenu?id_app=` + this.state.appID)
      .then(response => {
        return response;
      })
      .then(json => {

          if (json.data.success) {

            let dataValues = [];

            for (let i in json.data.data) {
              dataValues.push(json.data.data[i])
            }

            this.setState({items: dataValues});

          } else {
            alert("Error en el Request See Json to Debug");
            console.log(json);
          }
          ;
        }
      )
      .catch(error => {
        console.error(`An Error Occuredd! ${error}`);
      });
  }

  render() {

    var itemListBuild = function (item) {
      return (
        <li
          style={{
            padding: 15,
            border: "1px solid #cccccc",
            width: 250,
            textAlign: "left",
            marginBottom: 15,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          key={item.id}
        >
          <a href={item.url}>{item.name}</a>
        </li>
      );
    }

    return (
      <div>
        <h1>Menu - Item's</h1>
        <ul>
          {this.state.items.map(itemListBuild)}
        </ul>
      </div>

    );
  }
}

export default MenuItems;
