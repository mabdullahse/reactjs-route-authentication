import { useEffect, useState } from "react";

// hoc
export default function withLoader(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      var timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }, []);

    return <div>{loading ? "<p> loading</p>" : <Component {...props} />}</div>;
  };
}
