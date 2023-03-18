import { useContext } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
} from "./navigation.styles";

import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";

export default function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              style={{
                paddingLeft: 15,
              }}
              onClick={signOutUser}
            >
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink
              style={{
                paddingLeft: 15,
              }}
              to="/auth"
            >
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}
