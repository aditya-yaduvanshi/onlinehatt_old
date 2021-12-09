import {useState, useEffect} from "react";

function ClientOnly({children, ...rest}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <div {...rest}>{children}</div>;
}

export default ClientOnly;
