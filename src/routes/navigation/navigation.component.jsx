import { Outlet, Link } from "react-router-dom";
import { ReactComponent as MonarchLogo } from '../../assets/butterfly-origami-paper-svgrepo-com (1).svg';
import './navigation.styles.scss'

const Navigation = () => {
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <MonarchLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    <Link className="nav-link" to='/sign-in'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
  }

  export default Navigation;