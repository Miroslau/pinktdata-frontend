import useStyle from "../../style/style";

const MapPage = () => {
  const classes = useStyle();
  return (
    <section className={classes.wrapper}>
      <div className={classes.mapContentWrapper}>
        <div className={classes.mapContent}></div>
      </div>
    </section>
  );
};

export default MapPage;
