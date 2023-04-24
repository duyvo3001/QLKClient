import { Navigate ,Route } from "react-router-dom";

export const RouteWrapper = ({ component: Component, private: isPrivate, ...rest }) => {
    const isAuthenticated = true; // Replace with your authentication logic
  
    if (isPrivate && !isAuthenticated) {
      // If the route is private and the user is not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // Otherwise, render the component
    return <Route {...rest} render={props => <Component {...props} />} />;
};