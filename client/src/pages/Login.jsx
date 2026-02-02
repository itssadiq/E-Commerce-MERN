import { Link } from "react-router-dom";
import FormContainer from "../components/auth/FormContainer";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <FormContainer>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>
      </div>

      <LoginForm />

      {/* Footer Links */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New Customer?</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register a new account
          </Link>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default Login;
