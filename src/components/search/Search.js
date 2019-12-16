import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "../card/Card";
import { getRepos, getUsers } from "../../redux/actions";
import octopus from "../../images/gitHub-octopus.png";
import "./search.scss";

const ErrorBlock = ({ errorMessage }) => (
  <div>
    <p>Sorry, something went wrong.</p>
    <p>{errorMessage}</p>
    <p>Try searching again.</p>
  </div>
);

const Search = ({ users, errorMessage, handleSearch, getRepos }) => {
  const onChange = ({ target }) => {
    const trimmedValue = target.value.trim();
    if (trimmedValue.length > 2) handleSearch(trimmedValue);
  };

  return (
    <div className="search">
      <div className="search__form">
        <h1>Let's search GitHub users!</h1>
        <input
          type="text"
          placeholder="Type a github username..."
          onChange={onChange}
        />
      </div>
      {errorMessage && <ErrorBlock errorMessage={errorMessage} />}
      {users ? (
        <div className='search__cards'>
          {users.map(user => (
            <Card user={user} getRepos={getRepos} key={user.id} />
          ))}
        </div>
      ) : (
        <img className="search__octupus" src={octopus} />
      )}
    </div>
  );
};

const mapStateToProps = state => state.reducer;
const mapDispatchToProps = dispatch => ({
  handleSearch: value => dispatch(getUsers(value)),
  getRepos: user => dispatch(getRepos(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
Search.propTypes = {
  users: PropTypes.array,
  errorMessage: PropTypes.string,
  handleSearch: PropTypes.func
};