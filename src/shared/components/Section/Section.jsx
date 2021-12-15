import PropTypes from "prop-types";
import styles from "./Section.module.css";

const Section = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
