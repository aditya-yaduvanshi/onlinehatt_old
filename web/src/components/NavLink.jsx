import Link from "next/link";

const NavLink = ({to, children}) => {
  return (
    <Link href={to}>
      <a className="navlink">{children}</a>
    </Link>
  );
};

export default NavLink;
