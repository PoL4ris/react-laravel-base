import React from "react";
import axios from "axios";
import Login from "./Login";
import MenuItems from "./MenuItems";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    //let { user } = this.props.appstate;
    this.state = {
      token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.auth_token : "",
      users: [],
    };
  }

  componentDidMount() {
    // this._isMounted = true;
    axios
      .get(`http://localhost:8000/api/users/list?token=${this.state.token}`)
      .then(response => {
        return response;
      })
      .then(json => {
        // console.log(json);
        if (json.data.success) {
          this.setState({users: json.data.data});
          // console.log(json.data);
        } else alert("Login Failed!");
      })
      .catch(error => {
        console.error(`An Error Occuredd! ${error}`);
      });


  }

  componentWillUnmount() {
    // this._isMounted = false;
  }

  render() {
    return (
      <div style={styles}>
        <h2>Welcome Home {"\u2728"}</h2>
        <p>List of all users on the system</p>
        <ul>
          {this.state.users.map(user => (
            <ol
              style={{
                padding: 15,
                border: "1px solid #cccccc",
                width: 250,
                textAlign: "left",
                marginBottom: 15,
                marginLeft: "auto",
                marginRight: "auto"
              }}
              key={user.id}
            >
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </ol>
          ))}
        </ul>
        <button
          style={{padding: 10, backgroundColor: "red", color: "white"}}
          onClick={this.props.logoutUser}
        >
          Logout{" "}
        </button>
        <hr/>
        <MenuItems />
      </div>

    );
  }
}

// module.exports = Home;
export default Home;
