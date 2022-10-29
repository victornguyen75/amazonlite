import { ReactNode } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { User } from "./index";

interface UserMenuProps {
  status: string;
  user: User;
  handleLogout: () => void;
}

export const UserMenu = ({ status, user, handleLogout }: UserMenuProps) => {
  if (status === "loading") {
    return <span>Loading</span>;
  } else if (!user) {
    return (
      <Link href="/login">
        <a className="p-2">Login</a>
      </Link>
    );
  }

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="text-blue-600">{user.name}</Menu.Button>
      <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
        <Menu.Item>
          <DropdownLink className="dropdown-link" href="/profile">
            Profile
          </DropdownLink>
        </Menu.Item>
        <Menu.Item>
          <DropdownLink className="dropdown-link" href="/order-history">
            Order History
          </DropdownLink>
        </Menu.Item>
        <Menu.Item>
          <a href="#" className="dropdown-link" onClick={handleLogout}>
            Logout
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

UserMenu.displayName = "UserMenu";

interface DropdownLinkProps {
  href: string;
  children: ReactNode;
  [x: string]: any; // handles the rest properties
}

const DropdownLink = ({ href, children, ...rest }: DropdownLinkProps) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

DropdownLink.displayName = "DropdownLink";
