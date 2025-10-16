import { useForm } from "react-hook-form";
import { authClient } from "../../api/auth";
import { RhfInput } from "../../../components/input";
import { Link } from "react-router";

type SignInCreds = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const form = useForm<SignInCreds>();

  const submit = (data: SignInCreds) => {
    authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <div className="card bg-base-200">
          <form onSubmit={form.handleSubmit(submit)} className="card-body">
            <RhfInput
              name="email"
              control={form.control}
              title="E-mail"
              placeholder="name@mail.com"
            />
            <RhfInput
              name="password"
              control={form.control}
              title="Password"
              type="password"
              placeholder="*********"
            />
            <button type="submit" className="btn btn-primary mt-4">
              Sign In
            </button>
            <a className="link-neutral cursor-not-allowed">
              Don't have an account? Sign Up
            </a>
          </form>
        </div>
        <Link to="/" className="link link-hover link-neutral bottom-4 absolute">
          Back to the site
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
