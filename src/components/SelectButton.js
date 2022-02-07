import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid #053051",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: "pointer",
      backgroundColor: selected ? "#053051" : "",
      color: selected ? "#fff" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#053051",
        color: "#fff",
      },
      width: "22%",
        margin: 5,
    },
  });

  const classes = useStyles();
    const addClick = selected ? "" : onClick

  return (
    <span  onClick={addClick} className={classes.selectbutton}>
      {children} 
    </span>
  );
};

export default SelectButton;
