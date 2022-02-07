import PropTypes from "prop-types";
import style from "./Filter.module.css";

const Filter = ({ value, changeFilter }) => {
  return (
    <>
      <h2 className={style.Title}>Find contacts by name</h2>
      <input
        type="text"
        // name="filter"
        value={value}
        onChange={changeFilter}
      />
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
